// Payment service for handling Razorpay integration
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  amount: number;
  currency?: string;
  name?: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async (options: PaymentOptions): Promise<boolean> => {
  const isLoaded = await loadRazorpay();
  
  if (!isLoaded) {
    console.error('Razorpay SDK failed to load');
    return false;
  }

  return new Promise((resolve) => {
    const paymentOptions = {
      key: 'rzp_test_demo', // Demo key - replace with actual key
      amount: Math.round(options.amount * 100), // Convert to paise
      currency: options.currency || 'INR',
      name: options.name || 'Vendor App',
      description: options.description || 'Order Payment',
      image: '/placeholder.svg',
      handler: function (response: any) {
        console.log('Payment successful:', response);
        resolve(true);
      },
      prefill: options.prefill || {},
      theme: {
        color: options.theme?.color || '#3B82F6'
      },
      modal: {
        ondismiss: function() {
          resolve(false);
        }
      }
    };

    const rzp = new window.Razorpay(paymentOptions);
    rzp.open();
  });
};

export const mockPayment = async (amount: number): Promise<boolean> => {
  // Mock payment for demo purposes
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.1); // 90% success rate
    }, 2000);
  });
};