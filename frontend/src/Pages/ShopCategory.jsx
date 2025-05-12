import { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';
import { toKebabCase } from '../Utils/stringUtils';

const ShopCategory = ({ category }) => {
  const { all_product = [] } = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <h1 className='shopcategory-name'>{category}</h1>
      <div className='shopcategory-products'>
        {all_product
          .filter((item) => category === 'all' || item.category === category)
          .map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.gallery}
              inStock={item.inStock}
              price={item.prices?.[0]?.amount}
              currency={item.prices?.[0]?.currency.symbol}
              attributes={item.attributes}
              data-testid={`product-${toKebabCase(item.name)}`}
            />
          ))}
      </div>
    </div>
  );
};

export default ShopCategory;
