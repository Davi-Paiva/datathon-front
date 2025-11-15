export interface PredictionInput {
  product_A_sold_in_the_past: number;
  product_B_sold_in_the_past: number;
  product_A_recommended: number;
  product_A: number;
  product_C: number;
  product_D: number;
  cust_hitrate: number;
  cust_interactions: number;
  cust_contracts: number;
  opp_month: number;
  opp_old: number;
  competitor_Z: number;
  competitor_X: number;
  competitor_Y: number;
}

export interface PredictionResponse {
  prediction: number;
}
