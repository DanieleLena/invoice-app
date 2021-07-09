import React from 'react'

const Empty = () => {
    return (
      <section className="empty-container">
        <img src="/assets/illustration-empty.svg"></img>
        <div className="empty-text">
          <h2>There is nothing here</h2>
          <p>
            Create an invoice by clicking the<span className="bold-span"> New </span><span className="hidden-mobile-span">Invoice</span>  button and get started
          </p>
        </div>
      </section>
    );
}

export default Empty
