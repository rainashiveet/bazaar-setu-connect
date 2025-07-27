import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ArrowLeft, Smartphone, MessageSquare } from "lucide-react";

interface LoginFormProps {
  userType: 'vendor' | 'supplier';
  onBack: () => void;
}

export const LoginForm = ({ userType, onBack }: LoginFormProps) => {
  const { t } = useLanguage();
  const { sendOTP, login } = useAuth();
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!mobile || mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      await sendOTP(mobile);
      setStep('otp');
      toast.success("OTP sent! Use 123456 for demo");
    } catch (error) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const success = await login(mobile, otp, userType);
      if (success) {
        toast.success("Login successful!");
      } else {
        toast.error("Invalid OTP. Use 123456 for demo");
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const isVendor = userType === 'vendor';
  const cardBg = isVendor ? 'bg-gradient-primary' : 'bg-gradient-secondary';
  const iconBg = isVendor ? 'bg-primary/10' : 'bg-secondary/10';
  const iconColor = isVendor ? 'text-primary' : 'text-secondary';

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-background/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="shadow-elegant border-0">
          <CardHeader className={`${cardBg} text-center rounded-t-lg`}>
            <div className={`${iconBg} p-4 rounded-2xl w-20 h-20 mx-auto mb-4`}>
              {isVendor ? (
                <Smartphone className={`w-12 h-12 ${iconColor}`} />
              ) : (
                <MessageSquare className={`w-12 h-12 ${iconColor}`} />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              {t(userType === 'vendor' ? 'vendor.title' : 'supplier.title')}
            </CardTitle>
            <p className="text-white/90">
              {step === 'mobile' ? 'Enter your mobile number' : 'Enter the OTP sent to your phone'}
            </p>
          </CardHeader>

          <CardContent className="p-8">
            {step === 'mobile' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('mobile')}
                  </label>
                  <Input
                    type="tel"
                    placeholder="98XXXXXXXX"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="text-lg h-12"
                    maxLength={10}
                  />
                </div>
                <Button
                  onClick={handleSendOTP}
                  disabled={loading || mobile.length !== 10}
                  variant={isVendor ? "vendor" : "supplier"}
                  size="lg"
                  className="w-full"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('otp')}
                  </label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-lg h-12 text-center tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Demo OTP: <span className="font-mono font-bold">123456</span>
                  </p>
                </div>
                <Button
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.length !== 6}
                  variant={isVendor ? "vendor" : "supplier"}
                  size="lg"
                  className="w-full"
                >
                  {loading ? "Verifying..." : t('verify')}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setStep('mobile')}
                  className="w-full"
                >
                  Change mobile number
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};