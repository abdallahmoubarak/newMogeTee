interface Category {
  getBoundingClientRect(): unknown;
  height: number;
  _id: string;
  name: string;
  description?: string;
  hidden?: Boolean;
  titleBackground?: string;
  titleColor?: string;
  background?: string;
  topTitle?: string;
}

interface Product {
  _id: string;
  name: string;
  categoryID: string;
  description?: string;
  price: bigint;
  usdprice: number;
  newprice: number;
  hasImg: Boolean;
  image: string;
  appear: Boolean;
  exist: Boolean;
  hidden: Boolean;
}

interface ProductListProps {
  products: Product[];
  rate: number;
  setSelectedItems: (prev: SelectedItem[]) => void;
}

interface TopBarProps {
  categories: Category[];
  selected: string;
  setSelected: (selected: string) => void;
  setScroll: (scroll: boolean) => void;
}

interface SelectedItem {
  product: Product;
  count: number;
}

interface OrderBarProps {
  rate: number;
  selectedItems: SelectedItem[];
  clearSelectedItems: () => void;
  setModal: Function;
}

interface ModalProps {
  rate: number;
  selectedItems: SelectedItem[];
  setModal: Function;
}

interface ButtonProps {
  text: string;
  onClick: () => void;
}

interface CategoriesTop {
  [key: string]: number;
}

interface InputProps {
  value: string;
  setValue: Function;
  placeholder: string;
}
