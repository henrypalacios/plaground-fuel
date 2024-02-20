export interface AssetInfo {
    assetId?: string;
    assetSymbol?: string;
    assetDecimals?: number;
}

export const assetsMap:Record<string, AssetInfo> = {
    "0x0000000000000000000000000000000000000000000000000000000000000000" : {
        assetId: "0x0000000000000000000000000000000000000000000000000000000000000000",
        assetSymbol: 'ETH',
        assetDecimals: 18
    } 
}