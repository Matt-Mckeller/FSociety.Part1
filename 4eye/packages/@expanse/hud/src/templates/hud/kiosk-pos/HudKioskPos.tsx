"use client";
/**
 * HUD Template: Kiosk/POS
 *
 * Point of sale / kiosk application layout:
 * - Large touch-friendly buttons
 * - Cart summary
 * - Payment controls
 * - Order display
 * - Quick actions
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for retail POS, self-service kiosks, and ordering systems.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Badge,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentsIcon from "@mui/icons-material/Payments";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import HelpIcon from "@mui/icons-material/Help";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

// =============================================================================
// Types
// =============================================================================

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  modifiers?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon?: ReactNode;
  color?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  image?: string;
  description?: string;
}

export interface HudKioskPosProps {
  children?: ReactNode;
  cartItems?: CartItem[];
  categories?: Category[];
  products?: Product[];
  selectedCategoryId?: string;
  subtotal?: number;
  tax?: number;
  total?: number;
  customerName?: string;
  orderNumber?: string;
  onAddToCart?: (product: Product) => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onClearCart?: () => void;
  onCategorySelect?: (categoryId: string) => void;
  onPay?: (method: "card" | "cash" | "qr") => void;
  onSearch?: () => void;
  onHelp?: () => void;
  onApplyPromo?: () => void;
}

// =============================================================================
// Template Component
// =============================================================================

export function HudKioskPos({
  children,
  cartItems = [],
  categories = [],
  products = [],
  selectedCategoryId,
  subtotal,
  tax,
  total,
  customerName,
  orderNumber,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCategorySelect,
  onPay,
  onSearch,
  onHelp,
  onApplyPromo,
}: HudKioskPosProps) {
  const [activeCategory, setActiveCategory] = useState(selectedCategoryId || "all");

  const bgColor = "#f5f5f7";
  const panelBg = "#ffffff";
  const textColor = "#1a1a1a";
  const accentColor = "#3b82f6";

  // Default categories
  const displayCategories: Category[] = categories.length > 0 ? categories : [
    { id: "all", name: "All Items", color: "#6b7280" },
    { id: "food", name: "Food", color: "#ef4444" },
    { id: "drinks", name: "Drinks", color: "#3b82f6" },
    { id: "snacks", name: "Snacks", color: "#f59e0b" },
    { id: "desserts", name: "Desserts", color: "#ec4899" },
  ];

  // Default products
  const displayProducts: Product[] = products.length > 0 ? products : [
    { id: "1", name: "Burger", price: 8.99, categoryId: "food" },
    { id: "2", name: "Fries", price: 3.99, categoryId: "food" },
    { id: "3", name: "Pizza Slice", price: 4.99, categoryId: "food" },
    { id: "4", name: "Coffee", price: 2.99, categoryId: "drinks" },
    { id: "5", name: "Soda", price: 1.99, categoryId: "drinks" },
    { id: "6", name: "Water", price: 1.49, categoryId: "drinks" },
    { id: "7", name: "Chips", price: 1.99, categoryId: "snacks" },
    { id: "8", name: "Cookie", price: 2.49, categoryId: "desserts" },
  ];

  // Default cart items
  const displayCart: CartItem[] = cartItems.length > 0 ? cartItems : [
    { id: "1", name: "Burger", price: 8.99, quantity: 2 },
    { id: "2", name: "Fries", price: 3.99, quantity: 1 },
    { id: "3", name: "Soda", price: 1.99, quantity: 2 },
  ];

  const calcSubtotal = subtotal ?? displayCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const calcTax = tax ?? calcSubtotal * 0.08;
  const calcTotal = total ?? calcSubtotal + calcTax;

  const filteredProducts = activeCategory === "all"
    ? displayProducts
    : displayProducts.filter((p) => p.categoryId === activeCategory);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: bgColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ================================================================= */}
      {/* TOP: Header */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          bgcolor: panelBg,
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ bgcolor: accentColor, color: "white", "&:hover": { bgcolor: accentColor } }}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h5" sx={{ color: textColor, fontWeight: 600 }}>
            Order Kiosk
          </Typography>
          {orderNumber && (
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.5 }}>
              Order #{orderNumber}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            startIcon={<SearchIcon />}
            onClick={onSearch}
            sx={{ color: textColor }}
          >
            Search
          </Button>
          <Button
            startIcon={<LocalOfferIcon />}
            onClick={onApplyPromo}
            sx={{ color: textColor }}
          >
            Promo Code
          </Button>
          <IconButton onClick={onHelp} sx={{ color: textColor }}>
            <HelpIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* LEFT: Categories */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 88,
          left: 16,
          bottom: 16,
          width: 160,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          zIndex: 999,
        }}
      >
        {displayCategories.map((cat) => (
          <Paper
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              onCategorySelect?.(cat.id);
            }}
            sx={{
              p: 2,
              cursor: "pointer",
              bgcolor: activeCategory === cat.id ? accentColor : panelBg,
              color: activeCategory === cat.id ? "white" : textColor,
              borderRadius: 2,
              textAlign: "center",
              transition: "all 0.2s ease",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {cat.name}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* ================================================================= */}
      {/* CENTER: Products Grid */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "absolute",
          top: 88,
          left: 192,
          right: 380,
          bottom: 16,
          overflow: "auto",
          p: 2,
        }}
      >
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid size={{ zero: 6, tablet: 4, laptop: 3 }} key={product.id}>
              <Paper
                onClick={() => onAddToCart?.(product)}
                sx={{
                  p: 3,
                  cursor: "pointer",
                  bgcolor: panelBg,
                  borderRadius: 3,
                  textAlign: "center",
                  transition: "all 0.2s ease",
                  "&:hover": { transform: "scale(1.02)", boxShadow: 3 },
                  "&:active": { transform: "scale(0.98)" },
                  minHeight: 140,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {product.image && (
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      mx: "auto",
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: "#f0f0f0",
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "cover",
                    }}
                  />
                )}
                <Typography variant="body1" sx={{ color: textColor, fontWeight: 500, mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography variant="h6" sx={{ color: accentColor, fontWeight: 600 }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ================================================================= */}
      {/* RIGHT: Cart */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          top: 88,
          right: 16,
          bottom: 16,
          width: 340,
          bgcolor: panelBg,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 999,
        }}
      >
        {/* Cart Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Badge badgeContent={displayCart.reduce((sum, i) => sum + i.quantity, 0)} color="primary">
              <ShoppingCartIcon sx={{ color: textColor }} />
            </Badge>
            <Typography variant="h6" sx={{ color: textColor }}>
              Your Order
            </Typography>
          </Box>
          {displayCart.length > 0 && (
            <Button size="small" onClick={onClearCart} sx={{ color: "#ef4444" }}>
              Clear
            </Button>
          )}
        </Box>

        {/* Cart Items */}
        <List sx={{ flex: 1, overflow: "auto", py: 0 }}>
          {displayCart.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body1" sx={{ color: textColor, opacity: 0.5 }}>
                Your cart is empty
              </Typography>
            </Box>
          ) : (
            displayCart.map((item) => (
              <ListItem
                key={item.id}
                sx={{ borderBottom: "1px solid rgba(0,0,0,0.05)", py: 2 }}
              >
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)} each`}
                  sx={{
                    "& .MuiTypography-root": { color: textColor },
                    "& .MuiTypography-body2": { opacity: 0.5 },
                  }}
                />
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
                    sx={{ bgcolor: "rgba(0,0,0,0.05)" }}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" sx={{ color: textColor, minWidth: 24, textAlign: "center" }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                    sx={{ bgcolor: "rgba(0,0,0,0.05)" }}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body1" sx={{ color: textColor, fontWeight: 600, minWidth: 60, textAlign: "right" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </ListItem>
            ))
          )}
        </List>

        {/* Cart Summary */}
        <Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.1)", bgcolor: "#fafafa" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.7 }}>Subtotal</Typography>
            <Typography variant="body2" sx={{ color: textColor }}>${calcSubtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2" sx={{ color: textColor, opacity: 0.7 }}>Tax</Typography>
            <Typography variant="body2" sx={{ color: textColor }}>${calcTax.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" sx={{ color: textColor }}>Total</Typography>
            <Typography variant="h5" sx={{ color: accentColor, fontWeight: 700 }}>
              ${calcTotal.toFixed(2)}
            </Typography>
          </Box>

          {/* Payment Buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<CreditCardIcon />}
              onClick={() => onPay?.("card")}
              sx={{ bgcolor: accentColor, py: 1.5 }}
            >
              Card
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<PaymentsIcon />}
              onClick={() => onPay?.("cash")}
              sx={{ py: 1.5 }}
            >
              Cash
            </Button>
            <Button
              variant="outlined"
              startIcon={<QrCodeIcon />}
              onClick={() => onPay?.("qr")}
              sx={{ py: 1.5, minWidth: 56 }}
            />
          </Box>
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================================= */}
      {children}
    </Box>
  );
}
