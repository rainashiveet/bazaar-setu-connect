import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Package, 
  Plus, 
  TrendingUp, 
  ShoppingBag, 
  Bell,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";

const inventory = [
  { id: 1, name: 'प्याज', nameEn: 'Onions', stock: 150, unit: 'kg', price: '₹25/kg', status: 'available' },
  { id: 2, name: 'आलू', nameEn: 'Potatoes', stock: 5, unit: 'kg', price: '₹20/kg', status: 'low' },
  { id: 3, name: 'टमाटर', nameEn: 'Tomatoes', stock: 0, unit: 'kg', price: '₹30/kg', status: 'out' },
  { id: 4, name: 'तेल', nameEn: 'Oil', stock: 80, unit: 'L', price: '₹120/L', status: 'available' },
];

const newOrders = [
  { id: 1, vendor: 'राज कुमार', items: 'प्याज 10kg, आलू 5kg', itemsEn: 'Onions 10kg, Potatoes 5kg', amount: '₹350', status: 'pending' },
  { id: 2, vendor: 'सुनीता देवी', items: 'तेल 2L', itemsEn: 'Oil 2L', amount: '₹240', status: 'pending' },
  { id: 3, vendor: 'मोहन सिंह', items: 'आटा 20kg', itemsEn: 'Flour 20kg', amount: '₹700', status: 'accepted' },
];

const demandTrends = [
  { item: 'प्याज', itemEn: 'Onions', trend: '+25%', demand: 'high', color: 'text-success' },
  { item: 'आलू', itemEn: 'Potatoes', trend: '+5%', demand: 'medium', color: 'text-warning' },
  { item: 'टमाटर', itemEn: 'Tomatoes', trend: '+40%', demand: 'very high', color: 'text-destructive' },
];

export const SupplierDashboard = () => {
  const { t, language } = useLanguage();
  const { user, logout } = useAuth();

  const handleAcceptOrder = (orderId: number) => {
    toast.success("Order accepted!");
  };

  const handleRejectOrder = (orderId: number) => {
    toast.error("Order rejected");
  };

  const handleAddProduct = () => {
    toast.info("Add product feature coming soon!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'low': return 'bg-warning text-warning-foreground';
      case 'out': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'low': return <AlertCircle className="w-4 h-4" />;
      case 'out': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-gradient-secondary p-4 shadow-success">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-secondary-foreground">
              {t('supplier.welcome')}
            </h1>
            <p className="text-secondary-foreground/80">
              {user?.name} • GST: 27XXXXX1234X1ZX
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-secondary-foreground hover:bg-white/20">
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="text-secondary-foreground hover:bg-white/20"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-success">
            <CardContent className="p-6 text-center">
              <ShoppingBag className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">12</h3>
              <p className="text-muted-foreground">New Orders</p>
            </CardContent>
          </Card>
          <Card className="shadow-success">
            <CardContent className="p-6 text-center">
              <Package className="w-8 h-8 text-success mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">8</h3>
              <p className="text-muted-foreground">Active Products</p>
            </CardContent>
          </Card>
          <Card className="shadow-success">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-warning mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">₹12,450</h3>
              <p className="text-muted-foreground">Today's Sales</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Product Button */}
        <Button 
          variant="supplier" 
          size="lg" 
          onClick={handleAddProduct}
          className="w-full md:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('supplier.add_product')}
        </Button>

        {/* New Orders */}
        <Card className="shadow-warm">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShoppingBag className="w-6 h-6" />
              {t('supplier.new_orders')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {newOrders.map((order) => (
                <Card key={order.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{order.vendor}</h4>
                        <p className="text-muted-foreground">
                          {language === 'hi' ? order.items : order.itemsEn}
                        </p>
                        <p className="text-xl font-bold text-primary">{order.amount}</p>
                      </div>
                      <Badge variant={order.status === 'accepted' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                    {order.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleAcceptOrder(order.id)}
                          className="flex-1"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRejectOrder(order.id)}
                          className="flex-1"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Inventory Management */}
          <Card className="shadow-warm">
            <CardHeader className="bg-gradient-secondary text-secondary-foreground rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Package className="w-6 h-6" />
                {t('supplier.manage_inventory')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {inventory.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <h5 className="font-semibold">
                        {language === 'hi' ? item.name : item.nameEn}
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {item.stock} {item.unit} • {item.price}
                      </p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status}</span>
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demand Trends */}
          <Card className="shadow-warm">
            <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 className="w-6 h-6" />
                {t('supplier.demand_trends')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {demandTrends.map((trend, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h5 className="font-semibold">
                        {language === 'hi' ? trend.item : trend.itemEn}
                      </h5>
                      <p className="text-sm text-muted-foreground capitalize">{trend.demand} demand</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${trend.color}`}>
                        {trend.trend}
                      </p>
                      <TrendingUp className={`w-4 h-4 ${trend.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};