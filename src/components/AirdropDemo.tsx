import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Users, Gift, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AirdropDemo = () => {
  const exampleScenarios = [
    {
      title: "Community Rewards",
      description: "Reward your community members for their contributions",
      recipients: 50,
      amount: "0.5",
      total: "25",
      color: "bg-blue-500/10 border-blue-500/20",
      icon: Users,
    },
    {
      title: "Event Participants",
      description: "Distribute tokens to event attendees",
      recipients: 100,
      amount: "1.0",
      total: "100",
      color: "bg-green-500/10 border-green-500/20",
      icon: Gift,
    },
    {
      title: "Quick Distribution",
      description: "Fast token distribution to multiple addresses",
      recipients: 25,
      amount: "2.0",
      total: "50",
      color: "bg-purple-500/10 border-purple-500/20",
      icon: Zap,
    },
  ];

  const copyExampleCSV = (scenario: typeof exampleScenarios[0]) => {
    const exampleData = Array.from({ length: scenario.recipients }, (_, i) => 
      `0x${'a'.repeat(40)}${i.toString().padStart(2, '0')},${scenario.amount}`
    ).join('\n');
    
    navigator.clipboard.writeText(exampleData);
    toast({
      title: "Example CSV Copied",
      description: `Copied ${scenario.recipients} example recipients to clipboard`,
    });
  };

  return (
    <Card className="w-full bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-4 w-4" />
          Airdrop Examples
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Common airdrop scenarios and example data to get you started
        </p>
        
        <div className="space-y-3">
          {exampleScenarios.map((scenario, index) => {
            const IconComponent = scenario.icon;
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${scenario.color}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <IconComponent className="h-5 w-5 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-medium">{scenario.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {scenario.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs">
                        <span>{scenario.recipients} recipients</span>
                        <span>{scenario.amount} SHM each</span>
                        <span className="font-medium">{scenario.total} SHM total</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyExampleCSV(scenario)}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy CSV
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">How to Use:</h4>
          <ol className="text-sm text-muted-foreground space-y-1">
            <li>1. Connect your MetaMask wallet to Shardeum network</li>
            <li>2. Add recipient addresses and amounts manually or import CSV</li>
            <li>3. Review the total amount and your balance</li>
            <li>4. Click "Send Airdrop" to execute all transactions</li>
            <li>5. Monitor transaction status in the history panel</li>
          </ol>
        </div>

        <div className="text-xs text-muted-foreground">
          <p><strong>Note:</strong> Each recipient will receive a separate transaction. Gas fees apply to each transaction.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirdropDemo; 