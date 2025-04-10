import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Items/Item';

const ShopCategory = ({ category }) => {
  const { all_product = [] } = useContext(ShopContext); // Fallback to empty array

  return (
    <div className='shop-category'>
      <div className="shopcategory-name">{category}</div>
      

      <div className="shopcategory-products">
        {all_product
          .filter(item => category === 'all' || item.category === category)
            .map((item, i) => { 
              const kebabName = item.name.toLowerCase().replace(/\s+/g, '-');             
            return (
              <div data-testid={`product-${kebabName}`} key={i}>
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.gallery}
                inStock={item.inStock}
                price={item.prices?.[0]?.amount}
                currency={item.prices?.[0]?.currency.symbol}
                attributes={item.attributes}
              />
              </div>
            );
          })}
        </div>

    </div>
  );
};

export default ShopCategory;
