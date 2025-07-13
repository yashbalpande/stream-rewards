
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, Heart, Star, DollarSign } from 'lucide-react';

const Demo = () => {
  const [comment, setComment] = useState('');
  const [tipAmount, setTipAmount] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: "CryptoFan42", message: "Amazing stream! 🚀", tip: 5, time: "2m ago" },
    { id: 2, user: "BlockchainBob", message: "Love this new monetization model", tip: 0, time: "3m ago" },
    { id: 3, user: "SHMWhale", message: "Keep up the great work! 💎", tip: 25, time: "5m ago" }
  ]);
  const [earnings, setEarnings] = useState(127.50);

  const handleSendComment = () => {
    if (!comment.trim()) return;
    
    const newComment = {
      id: comments.length + 1,
      user: "You",
      message: comment,
      tip: tipAmount ? parseFloat(tipAmount) : 0,
      time: "now"
    };
    
    setComments([newComment, ...comments]);
    setEarnings(prev => prev + (tipAmount ? parseFloat(tipAmount) : 0.1));
    setComment('');
    setTipAmount('');
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Experience the Future of Livestreaming
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Try our interactive demo and see how Stream to Earn transforms viewer engagement
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Mock Stream Interface */}
          <div className="space-y-6">
            <Card className="bg-black/50 border-gray-700 p-4">
              <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-xl font-bold">Live Stream Demo</h3>
                  <p className="text-gray-300">Building the Future of Web3 Streaming</p>
                </div>
              </div>
            </Card>

            {/* Earnings Display */}
            <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Live Earnings</p>
                  <p className="text-3xl font-bold text-white">{earnings.toFixed(2)} SHM</p>
                </div>
                <DollarSign className="h-12 w-12 text-green-400" />
              </div>
            </Card>
          </div>

          {/* Interactive Chat */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Live Chat</h3>
                
                {/* Comment Input */}
                <div className="space-y-3">
                  <Input
                    placeholder="Type your comment (0.1 SHM)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="bg-black/50 border-gray-600 text-white placeholder-gray-400"
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tip amount (SHM)"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(e.target.value)}
                      className="flex-1 bg-black/50 border-gray-600 text-white placeholder-gray-400"
                      type="number"
                      min="0"
                      step="0.1"
                    />
                    <Button 
                      onClick={handleSendComment}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-3 rounded-lg bg-black/30 border border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-purple-300">{comment.user}</span>
                            <span className="text-xs text-gray-400">{comment.time}</span>
                            {comment.tip > 0 && (
                              <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                {comment.tip} SHM
                              </span>
                            )}
                          </div>
                          <p className="text-white">{comment.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                className="border-red-500/50 text-red-300 hover:bg-red-500/10"
                onClick={() => setEarnings(prev => prev + 1)}
              >
                <Heart className="h-4 w-4 mr-1" />
                1 SHM
              </Button>
              <Button 
                variant="outline" 
                className="border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/10"
                onClick={() => setEarnings(prev => prev + 5)}
              >
                <Star className="h-4 w-4 mr-1" />
                5 SHM
              </Button>
              <Button 
                variant="outline" 
                className="border-green-500/50 text-green-300 hover:bg-green-500/10"
                onClick={() => setEarnings(prev => prev + 10)}
              >
                <DollarSign className="h-4 w-4 mr-1" />
                10 SHM
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
