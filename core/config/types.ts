enum EOrderTabKeys {
  MyOrder = 'MyOrder',
  AllOrders = 'AllOrders',
}

export type TOrderTabRoutes = Array<{
  key: keyof typeof EOrderTabKeys;
  title: string;
}>;

export {EOrderTabKeys};
