import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import Previous from '../assets/previous.svg';
import Next from '../assets/next.svg';
import { CartContext } from '../../Context/CartContext';

const ProductDisplay = ({ product }) => {
  const { addToCart, setIsCartOpen } = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState({});

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.gallery.length - 1 : prev - 1
    );
  };

  const handleSelect = (attrIndex, choiceIndex) => {
    setSelected((prev) => ({
      ...prev,
      [attrIndex]: prev[attrIndex] === choiceIndex ? null : choiceIndex,
    }));
  };

  const isButtonEnabled = 
  product.inStock &&
  product.attributes.every(
    (_, index) => selected[index] !== undefined && selected[index] !== null
  );

  const getChoices = () => {
    const choices = {};
    product.attributes.forEach((attribute, attrIndex) => {
      const itemIndex = selected[attrIndex];
      if (itemIndex !== null && itemIndex !== undefined) {
        choices[attribute.name] = attribute.items[itemIndex].value;
      }
    });
    return choices;
  };

  const toKebabCase = (str) =>
    str && str.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="productdisplay">
      <div
        className="productdisplay-left"
        data-testid="product-gallery">
        <div className="productdisplay-img-list w-150 h-50">
          {product.gallery.map((img, i) => (
            <img key={i} onClick={() => setCurrentIndex(i)} src={img} alt="" />
          ))}
        </div>

        <div className="productdisplay-img object-contain">
          <img
            className="productdisplay-main-img w-0 h-100"
            src={product.gallery[currentIndex]}
            alt="Main product"/>
          <img
            onClick={prevImage}
            className="productdisplay-img-previousimage w-0 h-10"
            src={Previous}
            alt="Previous"/>
          <img
            onClick={nextImage}
            className="productdisplay-img-nextimage w-0 h-10"
            src={Next}
            alt="Next"/>
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        {product.attributes.map((attribute, attrIndex) => (
          <div
            key={product.attributes?.[0].name}
            className="productdisplay-attribute-name space-y-2"
            data-testid={`product-attribute-${toKebabCase(attribute.name)}`}>

            <div className="font-bold">{attribute.name}:</div>
            <div className="flex gap-1">
              
              {attribute.items.map((item, choiceIndex) => {
                const isSelected = selected[attrIndex] === choiceIndex;
                const commonStyles = { cursor: 'pointer' };

                return attribute.name === 'Color' ? (
                  <div
                    key={choiceIndex}
                    className="productdisplay-attribute-type-color"
                    style={{
                      ...commonStyles,
                      backgroundColor: item.value,
                      outline: isSelected ? '1px solid #5cce81' : '',
                      outlineOffset: '1px',
                    }}
                    onClick={() => handleSelect(attrIndex, choiceIndex)}/>
                ) : (
                  <div
                    key={choiceIndex}
                    className="productdisplay-attribute-type-standard text-center items-center"
                    style={{
                      ...commonStyles,
                      backgroundColor: isSelected ? '#1d1f22' : 'white',
                      color: isSelected ? 'white' : '#1d1f22',
                    }}
                    onClick={() => handleSelect(attrIndex, choiceIndex)}>
                    {item.value}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="productdisplay-right-price">PRICE:</div>
        <div className="productdisplay-right-amount">{product.prices?.[0]?.currency.symbol}{product.prices?.[0]?.amount}</div>

        <button
          data-testid="add-to-cart"
          style={{
            backgroundColor: isButtonEnabled ? '#5cce81' : 'grey',
            cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
          }}
          disabled={!isButtonEnabled}
          onClick={() => {
            addToCart(product.id, getChoices());
            setIsCartOpen(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
          ADD TO CART
        </button>

        <div
          className="productdisplay-right-description"
          data-testid="product-description">
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
