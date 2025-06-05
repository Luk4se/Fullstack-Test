import { useContext, useState } from 'react';
import './ProductDisplay.css';
import Previous from '../../Utils/Assets/previous.svg';
import Next from '../../Utils/Assets/next.svg';
import { CartContext } from '../../Context/CartContext';
import { toKebabCase } from '../../Utils/stringUtils';
import parse from 'html-react-parser';

const ProductDisplay = ({ product }) => {
  const { addToCart, setIsCartOpen } = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState({});

  const formatDescription = (text) => {
    return parse(text.replace(/\\n/g, '<br />'));
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev < product.gallery.length - 1 ? prev + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : product.gallery.length - 1
    );
  };

  const handleSelect = (attrIndex, choiceIndex) => {
    setSelected((prev) => ({
      ...prev,
      [attrIndex]: prev[attrIndex] === choiceIndex ? undefined : choiceIndex,
    }));
  };

  const isButtonEnabled =
    product.inStock &&
    product.attributes.every(
      (_, index) => selected[index] !== undefined && selected[index] !== null
    );

  const getChoices = () =>
    product.attributes.reduce((acc, attribute, attrIndex) => {
      const itemIndex = selected[attrIndex];
      if (itemIndex !== null && itemIndex !== undefined) {
        acc[attribute.name] = attribute.items[itemIndex].value;
      }
      return acc;
    }, {});

  return (
    <div className='productdisplay'>
      <section className='productdisplay-left' data-testid='product-gallery'>
        <div className='productdisplay-img-list'>
          {product.gallery.map((img, i) => (
            <img
              key={i}
              onClick={() => setCurrentIndex(i)}
              src={img}
              alt={`Thumbnail ${i}`}
              data-testid={`product-thumbnail-${i}`}
            />
          ))}
        </div>

        <figure className='productdisplay-img'>
          <img
            className='productdisplay-main-img'
            src={product.gallery[currentIndex]}
            alt='Main product'
            data-testid='product-main-image'
          />
          <img
            onClick={prevImage}
            className='productdisplay-img-previousimage'
            src={Previous}
            alt='Previous'
            data-testid='previous-image'
          />
          <img
            onClick={nextImage}
            className='productdisplay-img-nextimage'
            src={Next}
            alt='Next'
            data-testid='next-image'
          />
        </figure>
      </section>

      <section className='productdisplay-right'>
        <h1 data-testid='product-name'>{product.name}</h1>

        {product.attributes.map((attribute, attrIndex) => (
          <div key={attribute.name} className='productdisplay-attribute'>
            <div className='productdisplay-attribute-name'>
              {attribute.name}:
            </div>
            <div className='productdisplay-attribute-values'>
              {attribute.items.map((item, choiceIndex) => {
                const isSelected = selected[attrIndex] === choiceIndex;
                return attribute.name === 'Color' ? (
                  <div
                    key={choiceIndex}
                    className={`productdisplay-attribute-color ${
                      isSelected ? 'selected-color' : ''
                    }`}
                    data-testid={`product-attribute-${toKebabCase(
                      attribute.name
                    )}-${item.value}`}
                    style={{ backgroundColor: item.value }}
                    onClick={() => handleSelect(attrIndex, choiceIndex)}
                  />
                ) : (
                  <div
                    key={choiceIndex}
                    className={`productdisplay-attribute-item ${
                      isSelected ? 'selected-item' : ''
                    }`}
                    data-testid={`product-attribute-${toKebabCase(
                      attribute.name
                    )}-${item.value}`}
                    onClick={() => handleSelect(attrIndex, choiceIndex)}
                  >
                    {item.value}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <strong>PRICE:</strong>
        <p data-testid='product-price'>
          {product.prices?.[0]?.currency.symbol}
          {product.prices?.[0]?.amount}
        </p>

        <button
          className='productdisplay-add-to-cart'
          data-testid='add-to-cart'
          disabled={!isButtonEnabled}
          onClick={() => {
            addToCart(product.id, getChoices());
            setIsCartOpen(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          ADD TO CART
        </button>

        <article
          className='productdisplay-right-description'
          data-testid='product-description'
        >
          {formatDescription(product.description)}
        </article>
      </section>
    </div>
  );
};

export default ProductDisplay;
