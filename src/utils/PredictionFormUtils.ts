import type { PredictionInput } from '../types/prediction.types';

const fieldLabels: Record<keyof PredictionInput, string> = {
    product_A_sold_in_the_past: 'Product A Sold in Past',
    product_B_sold_in_the_past: 'Product B Sold in Past',
    product_A_recommended: 'Product A Recommended',
    product_A: 'Product A',
    product_C: 'Product C',
    product_D: 'Product D',
    cust_hitrate: 'Customer Hit Rate',
    cust_interactions: 'Customer Interactions',
    cust_contracts: 'Customer Contracts',
    opp_month: 'Opportunity Month',
    opp_old: 'Opportunity Age',
    competitor_Z: 'Competitor Z',
    competitor_X: 'Competitor X',
    competitor_Y: 'Competitor Y',
};

const initialFormData: PredictionInput = {
    product_A_sold_in_the_past: 0,
    product_B_sold_in_the_past: 0,
    product_A_recommended: 0,
    product_A: 0,
    product_C: 0,
    product_D: 0,
    cust_hitrate: 0,
    cust_interactions: 0,
    cust_contracts: 0,
    opp_month: 0,
    opp_old: 0,
    competitor_Z: 0,
    competitor_X: 0,
    competitor_Y: 0,
};

export { fieldLabels, initialFormData };