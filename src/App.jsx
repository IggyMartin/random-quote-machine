import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa"
import './App.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: '',
      author: '',
      color: 'red',
      fade: false
    }
    this.getQuotes = this.getQuotes.bind(this)
    this.triggerFade = this.triggerFade.bind(this)
    this.together = this.together.bind(this)
  }

  componentDidMount() {
    this.getQuotes()
  }

  getQuotes() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(response => response.json())
    .then(data => {
      let random = data.quotes[Math.floor(Math.random() * data.quotes.length)]
      let red = Math.floor(Math.random() * 128)
      let green = Math.floor(Math.random() * 128)
      let blue = Math.floor(Math.random() * 128)
      this.setState({
        quote: random.quote,
        author: random.author,
        color: `rgb(${red}, ${green}, ${blue})`,
      })})
    }


    triggerFade() {
      let quote = document.getElementById("text")
      let author = document.getElementById("author")
      quote.classList.remove(quote.classList.value)
      author.classList.remove(author.classList.value)
      void quote.offsetWidth;
      void author.offsetWidth;
      quote.classList.add("withAnimation")
      author.classList.add("withAnimation")
    }

    together() {
      this.getQuotes()
      this.triggerFade()
    }
  render() {
    const transition = 'all 2s'

    return (
      <div className="container" style={{backgroundColor: this.state.color, transition}}>
        <div id="quote-box">
          <p id='text' className="withAnimation" style={{color: this.state.color, transition}} ><FaQuoteLeft/> {this.state.quote}</p>
          <p id="author" className="withAnimation" style={{color: this.state.color, transition}} >- {this.state.author}</p>
          <div className="container2">
            <a style={{backgroundColor: this.state.color, transition}} className="shared" target="_blank" href="https://twitter.com/intent/tweet" id="tweet-quote"><BsTwitter/></a>
            <button style={{backgroundColor: this.state.color, transition}} id="new-quote" className="shared" onClick={this.together}>Next Quote</button>
          </div>
        </div>
        <p className="creator">By Iggy</p>
      </div>
    )
  }
}
