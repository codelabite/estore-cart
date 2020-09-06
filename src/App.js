import React from "react";
import data from "./data.json";
import Products from "./Component/product";
import Filter from "./Component/Filter";
import Cart from "./Component/Cart";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: data.products,
      cartItem: localStorage.getItem("cartItem")
        ? JSON.parse(localStorage.getItem("cartItem"))
        : [],
      size: "",
      sort: "",
    };
  }

  createOrder = (order) => {
    alert(
      "Thanks for Shopping with us, Hope we serve you well... See you next time!"
    );
  };

  removeFromCart = (product) => {
    const cartItem = this.state.cartItem.slice();
    this.setState({
      cartItem: cartItem.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cartItem",
      JSON.stringify(cartItem.filter((x) => x._id !== product._id))
    );
  };

  addToCart = (product) => {
    const cartItem = this.state.cartItem.slice();
    let alreadyInCart = false;
    cartItem.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItem.push({ ...product, count: 1 });
    }
    this.setState({ cartItem });
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  };

  sortProducts = (event) => {
    //impliment
    const sort = event.target.value;

    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
    console.log(event.target.value);
  };

  filterProduct = (event) => {
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
    console.log(event.target.value);
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">E-Commerce Shopping TEST build</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter className="stayHere"
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProduct={this.filterProduct}
                sortProduct={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItem={this.state.cartItem}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All Right Reserved | BrighterDays CodeLab</footer>
      </div>
    );
  }
}

export default App;
