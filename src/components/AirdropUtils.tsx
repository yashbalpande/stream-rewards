import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Upload, FileText } from 'lucide-react';

interface AirdropRecipient {
  address: string;
  amount: string;
  isValid: boolean;
}

interface AirdropUtilsProps {
  recipients: AirdropRecipient[];
  onImport: (recipients: AirdropRecipient[]) => void;
}

const AirdropUtils = ({ recipients, onImport }: AirdropUtilsProps) => {
  const exportToCSV = () => {
    const validRecipients = recipients.filter(r => r.isValid);
    if (validRecipients.length === 0) {
      return;
    }

    const csvContent = validRecipients
      .map(r => `${r.address},${r.amount}`)
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `airdrop_recipients_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const importFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      const importedRecipients: AirdropRecipient[] = lines.map(line => {
        const [address, amount] = line.split(',').map(item => item.trim());
        return {
          address: address || '',
          amount: amount || '',
          isValid: false, // Will be validated by parent component
        };
      });

      onImport(importedRecipients);
    };
    reader.readAsText(file);
  };

  const validRecipientsCount = recipients.filter(r => r.isValid).length;

  return (
    <Card className="w-full bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Import/Export Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            disabled={validRecipientsCount === 0}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          
          <div className="flex-1">
            <input
              type="file"
              accept=".csv"
              onChange={importFromCSV}
              className="hidden"
              id="csv-import"
            />
            <label htmlFor="csv-import">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                asChild
              >
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </span>
              </Button>
            </label>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p>• Export: Download current valid recipients as CSV</p>
          <p>• Import: Load recipients from CSV file (address,amount format)</p>
          <p>• Valid recipients: {validRecipientsCount}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirdropUtils; 