
export interface EquityData {
  initialShares: number;
  equityPercentage: number;
  companyValuation: number;
  newInvestmentAmount: number;
  postMoneyValuation: number;
  newSharesIssued: number;
  totalSharesAfterDilution: number;
  newEquityPercentage: number;
  equityValueBeforeDilution: number;
  equityValueAfterDilution: number;
}

export const calculateEquityDilution = (
  initialShares: number,
  yourShares: number,
  companyValuation: number,
  investmentAmount: number
): EquityData => {
  // Calculate initial equity percentage
  const equityPercentage = (yourShares / initialShares) * 100;

  // Calculate post-money valuation
  const postMoneyValuation = companyValuation + investmentAmount;

  // Calculate price per share
  const pricePerShare = companyValuation / initialShares;

  // Calculate new shares issued
  const newSharesIssued = investmentAmount / pricePerShare;

  // Calculate total shares after dilution
  const totalSharesAfterDilution = initialShares + newSharesIssued;

  // Calculate new equity percentage
  const newEquityPercentage = (yourShares / totalSharesAfterDilution) * 100;

  // Calculate equity value before dilution
  const equityValueBeforeDilution = (equityPercentage / 100) * companyValuation;

  // Calculate equity value after dilution
  const equityValueAfterDilution = (newEquityPercentage / 100) * postMoneyValuation;

  return {
    initialShares,
    equityPercentage,
    companyValuation,
    newInvestmentAmount: investmentAmount,
    postMoneyValuation,
    newSharesIssued,
    totalSharesAfterDilution,
    newEquityPercentage,
    equityValueBeforeDilution,
    equityValueAfterDilution,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return value.toFixed(2) + '%';
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN').format(Math.round(value));
};
