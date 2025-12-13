import api from "@/lib/axios";

// Monthly Payment
export const createMonthlyPayment = (data: {
  partnership_level: string;
  plan: string;
  payment_type: string;   // "MONTHLY"
}) => {
  return api.post(`/payments/monthly`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

// Lateral Payment (same-level switch)
export const createLateralPayment = (data: {
  partnership_level: string;
  plan: string;
  payment_type: string;    // "LATERAL"
  from_partnership: string;
}) => {
  return api.post(`/payments/lateral`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

// Registration Payment (moving up to higher level)
export const createRegistrationPayment = (data: {
  partnership_level: string;
  plan: string;
  payment_type: string;    // "REGISTRATION"
  from_partnership: string;
}) => {
  return api.post(`/payments/registration`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

// Payment History
export const getPaymentHistory = () => {
  return api.get(`/payments/history`, {
    headers: {
      requiresAuth: true,
    },
  });
};
