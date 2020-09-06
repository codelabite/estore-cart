import React, { Component } from "react";
import { data } from "autoprefixer";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      address: "",
      email: "",
      showCheckOut: false,
    };
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItem: this.props.cartItem,
    };
    this.props.createOrder(order);
  };

  render() {
    const { cartItem } = this.props;
    return (
      <div>
        {cartItem.length === 0 ? (
          <div className="cart cart-header">Your cart is Empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItem.length} items in your cart {""}
          </div>
        )}

        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItem.map((item) => (
                <li key={cartItem._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      # {item.price} x {item.count} {""}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {cartItem.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total: #{" "}
                    {cartItem.reduce((a, c) => a + c.price * c.count, 0)}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({
                        showCheckOut: true,
                      });
                    }}
                    className="button primary"
                  >
                    Process
                  </button>
                </div>
              </div>
              {this.state.showCheckOut && (
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Email </label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>

                      <li>
                        <label>Name </label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>

                      <li>
                        <label>Address </label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>

                      <li>
                        <button className=" button primary" type="submit">
                          Check Out
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
