import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Gift, Users, Send, AlertCircle, CheckCircle, Plus, Trash2, Shuffle } from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { toast } from '@/hooks/use-toast';
import { ethers } from 'ethers';
import AirdropUtils from './AirdropUtils';

interface AirdropRecipient {
  address: string;
  amount: string;
  isValid: boolean;
}

// AddressBookEntry type
interface AddressBookEntry {
  address: string;
  label?: string;
}

const ADDRESS_BOOK_KEY = 'airdrop_address_book';

const Airdrop = () => {
  const { address, balance, isConnected, signer } = useWallet();
  const [recipients, setRecipients] = useState<AirdropRecipient[]>([
    { address: '', amount: '', isValid: false }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalAmount, setTotalAmount] = useState('0');
  const historyRef = useRef<{ addTransaction: (tx: any) => void }>(null);

  // Address book state
  const [addressBook, setAddressBook] = useState<AddressBookEntry[]>([]);
  const [newAddress, setNewAddress] = useState('');
  const [newLabel, setNewLabel] = useState('');

  // Load address book from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(ADDRESS_BOOK_KEY);
    if (stored) setAddressBook(JSON.parse(stored));
  }, []);

  // Save address book to localStorage
  useEffect(() => {
    localStorage.setItem(ADDRESS_BOOK_KEY, JSON.stringify(addressBook));
  }, [addressBook]);

  const validateAddress = (address: string): boolean => {
    return ethers.isAddress(address);
  };

  const validateAmount = (amount: string): boolean => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const updateRecipient = (index: number, field: 'address' | 'amount', value: string) => {
    const newRecipients = [...recipients];
    newRecipients[index] = {
      ...newRecipients[index],
      [field]: value,
      isValid: field === 'address' 
        ? validateAddress(value) && validateAmount(newRecipients[index].amount)
        : validateAmount(value) && validateAddress(newRecipients[index].address)
    };
    setRecipients(newRecipients);
    calculateTotal(newRecipients);
  };

  const addRecipient = () => {
    setRecipients([...recipients, { address: '', amount: '', isValid: false }]);
  };

  const removeRecipient = (index: number) => {
    if (recipients.length > 1) {
      const newRecipients = recipients.filter((_, i) => i !== index);
      setRecipients(newRecipients);
      calculateTotal(newRecipients);
    }
  };

  const calculateTotal = (recipientsList: AirdropRecipient[]) => {
    const total = recipientsList.reduce((sum, recipient) => {
      const amount = parseFloat(recipient.amount) || 0;
      return sum + amount;
    }, 0);
    setTotalAmount(total.toString());
  };

  const handleBulkInput = (value: string) => {
    const lines = value.split('\n').filter(line => line.trim());
    const newRecipients: AirdropRecipient[] = [];
    
    lines.forEach(line => {
      const [address, amount] = line.split(',').map(item => item.trim());
      if (address && amount) {
        newRecipients.push({
          address,
          amount,
          isValid: validateAddress(address) && validateAmount(amount)
        });
      }
    });

    if (newRecipients.length > 0) {
      setRecipients(newRecipients);
      calculateTotal(newRecipients);
    }
  };

  const handleImportRecipients = (importedRecipients: AirdropRecipient[]) => {
    const validatedRecipients = importedRecipients.map(recipient => ({
      ...recipient,
      isValid: validateAddress(recipient.address) && validateAmount(recipient.amount)
    }));
    
    setRecipients(validatedRecipients);
    calculateTotal(validatedRecipients);
    
    toast({
      title: "Recipients Imported",
      description: `Imported ${importedRecipients.length} recipients`,
    });
  };

  // Add address to address book
  const handleAddToAddressBook = () => {
    if (!validateAddress(newAddress)) {
      toast({ title: 'Invalid Address', description: 'Please enter a valid address', variant: 'destructive' });
      return;
    }
    if (addressBook.some(entry => entry.address === newAddress)) {
      toast({ title: 'Duplicate Address', description: 'Address already in address book', variant: 'destructive' });
      return;
    }
    setAddressBook([{ address: newAddress, label: newLabel }, ...addressBook]);
    setNewAddress('');
    setNewLabel('');
  };

  // Remove address from address book
  const handleRemoveFromAddressBook = (address: string) => {
    setAddressBook(addressBook.filter(entry => entry.address !== address));
  };

  // Add address book entry to recipients
  const handleAddBookEntryToRecipients = (entry: AddressBookEntry) => {
    setRecipients([
      ...recipients,
      { address: entry.address, amount: '', isValid: false },
    ]);
  };

  // Randomly select N addresses from address book and add to recipients
  const handleSelectRandomRecipients = () => {
    if (addressBook.length === 0) {
      toast({ title: 'Address Book Empty', description: 'Add addresses to the address book first', variant: 'destructive' });
      return;
    }
    const n = parseInt(prompt('How many random recipients? (max: ' + addressBook.length + ')') || '0', 10);
    if (isNaN(n) || n <= 0 || n > addressBook.length) {
      toast({ title: 'Invalid Number', description: 'Enter a valid number of recipients', variant: 'destructive' });
      return;
    }
    // Shuffle and pick n
    const shuffled = [...addressBook].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, n);
    setRecipients(selected.map(entry => ({ address: entry.address, amount: '', isValid: false })));
  };

  const executeAirdrop = async () => {
    if (!isConnected || !signer) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    const validRecipients = recipients.filter(r => r.isValid);
    if (validRecipients.length === 0) {
      toast({
        title: "Invalid Recipients",
        description: "Please add valid addresses and amounts",
        variant: "destructive",
      });
      return;
    }

    const total = parseFloat(totalAmount);
    const currentBalance = parseFloat(balance || '0');
    
    if (total > currentBalance) {
      toast({
        title: "Insufficient Balance",
        description: `You need ${total} SHM but have ${currentBalance} SHM`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create batch transaction
      const txPromises = validRecipients.map(recipient => {
        const amountWei = ethers.parseEther(recipient.amount);
        return signer.sendTransaction({
          to: recipient.address,
          value: amountWei,
        });
      });

      const transactions = await Promise.all(txPromises);
      
      // Add transactions to history
      transactions.forEach((tx, index) => {
        const recipient = validRecipients[index];
        const transactionData = {
          hash: tx.hash,
          recipient: recipient.address,
          amount: recipient.amount,
          timestamp: Date.now(),
          status: 'pending' as const,
        };
        
        // Save to localStorage
        const stored = localStorage.getItem(`airdrop_history_${address}`);
        const history = stored ? JSON.parse(stored) : [];
        history.unshift(transactionData);
        localStorage.setItem(`airdrop_history_${address}`, JSON.stringify(history));
      });

      toast({
        title: "Airdrop Successful!",
        description: `Sent ${validRecipients.length} transactions successfully`,
      });

      // Reset form
      setRecipients([{ address: '', amount: '', isValid: false }]);
      setTotalAmount('0');

    } catch (error: any) {
      console.error('Airdrop error:', error);
      toast({
        title: "Airdrop Failed",
        description: error.message || "Failed to execute airdrop",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const validRecipientsCount = recipients.filter(r => r.isValid).length;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Gift className="h-5 w-5" />
          Community Airdrop
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Share SHM tokens with your community members
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Address Book Section */}
        <div className="mb-6 p-4 rounded-lg border border-muted-foreground/10 bg-muted/30">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-base flex-1 flex items-center gap-2">
              <Users className="h-4 w-4" /> Address Book
            </h3>
            <Button variant="outline" size="sm" onClick={handleSelectRandomRecipients} disabled={addressBook.length === 0}>
              <Shuffle className="h-4 w-4 mr-1" /> Select Random Recipients
            </Button>
          </div>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="0x..."
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Label (optional)"
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              className="flex-1"
            />
            <Button variant="default" size="sm" onClick={handleAddToAddressBook}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {addressBook.length === 0 ? (
              <div className="text-xs text-muted-foreground">No addresses saved yet.</div>
            ) : (
              addressBook.map((entry, idx) => (
                <div key={entry.address} className="flex items-center gap-2 text-xs bg-card/60 rounded px-2 py-1">
                  <span className="font-mono">{entry.address.slice(0, 6)}...{entry.address.slice(-4)}</span>
                  {entry.label && <span className="ml-1 text-muted-foreground">({entry.label})</span>}
                  <Button variant="ghost" size="xs" onClick={() => handleAddBookEntryToRecipients(entry)}>
                    Add
                  </Button>
                  <Button variant="ghost" size="xs" onClick={() => handleRemoveFromAddressBook(entry.address)}>
                    <Trash2 className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
        {!isConnected ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Connect your wallet to start airdropping tokens
            </p>
          </div>
        ) : (
          <>
            {/* Bulk Input */}
            <div className="space-y-2">
              <Label htmlFor="bulk-input">Bulk Import (Address, Amount)</Label>
              <Textarea
                id="bulk-input"
                placeholder="0x1234...5678, 1.5&#10;0xabcd...efgh, 2.0&#10;0x9876...5432, 0.5"
                className="h-24"
                onChange={(e) => handleBulkInput(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter one recipient per line: address, amount
              </p>
            </div>

            <Separator />

            {/* Import/Export Tools */}
            <AirdropUtils 
              recipients={recipients}
              onImport={handleImportRecipients}
            />

            <Separator />

            {/* Individual Recipients */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Recipients</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {validRecipientsCount} valid
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addRecipient}
                  >
                    Add Recipient
                  </Button>
                </div>
              </div>

              {recipients.map((recipient, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="0x..."
                      value={recipient.address}
                      onChange={(e) => updateRecipient(index, 'address', e.target.value)}
                      className={recipient.address && !validateAddress(recipient.address) ? 'border-red-500' : ''}
                    />
                    <Input
                      placeholder="Amount (SHM)"
                      type="number"
                      step="0.001"
                      value={recipient.amount}
                      onChange={(e) => updateRecipient(index, 'amount', e.target.value)}
                      className={recipient.amount && !validateAmount(recipient.amount) ? 'border-red-500' : ''}
                    />
                  </div>
                  <div className="flex items-center gap-1 pt-2">
                    {recipient.isValid ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    {recipients.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRecipient(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Summary */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Amount</span>
                <span className="text-lg font-bold">{totalAmount} SHM</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Your Balance</span>
                <span className="text-sm">{balance} SHM</span>
              </div>

              {parseFloat(totalAmount) > parseFloat(balance || '0') && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-500">
                    Insufficient balance for this airdrop
                  </span>
                </div>
              )}
            </div>

            {/* Execute Button */}
            <Button
              onClick={executeAirdrop}
              disabled={isProcessing || validRecipientsCount === 0 || parseFloat(totalAmount) > parseFloat(balance || '0')}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Airdrop ({validRecipientsCount} recipients)
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Airdrop; 