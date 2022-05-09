import { Location } from 'history';
import { ReactNode } from 'react';

export type TUserData = {
  name: string;
  email: string;
  password: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TResetPassword = {
  password: string;
  token: string;
};

export type TIngredient = {
  readonly id?: string;
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  uniqueID?: string;
  count?: number;
  index?: number;
};

export type TOrder = {
  readonly number: number;
  readonly name: string;
  readonly status: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly ingredients: string[] | TIngredient[];
  readonly _id: string;
};

export type TLocation = {
  background?: Location<TLocation>;
  location?: string;
  from?: {pathname: string};
};

export type TOrderHistory = {
  readonly orders: Array<TOrder>
};


export type TOrderCard = {
  order: TOrder
};

export type TModalOverlay = {
  onClose: (a?: boolean) => void;
}

export type TModalProps = TModalOverlay & {
  readonly title: string;
  readonly children: ReactNode;
}

export type TConstructorMainItem = {
  id?: string;
  item: TIngredient;
  index: number;
}

export type TBurgerIngredient = {
  readonly item: TIngredient;
}

// в button.d.ts добавила children?: string;
