import React, { Component } from "react";
import axios from "axios";

class ScrollComponent extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: false,
      page: 1,
      prevY: 0
    };
  }

  getPhotos(page){
    this.setState({ loading: true });
    axios
      .get(
        `https://pixabay.com/api/?key=15612322-16021d429994f46b808f3487b&page=${page}&per_page=10`
      )
      .then(res => {
        this.setState({ photos: [...this.state.photos, ...res.data.hits] });
        this.setState({ loading: false });
      });
}

componentDidMount() {
    this.getPhotos(this.state.page);

	var options = {
		root: null,
		rootMargin: "0px",
		threshold: 1.0
	  };
	  
	  this.observer = new IntersectionObserver(
		this.handleObserver.bind(this),
		options
	  );
	  this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      const lastPhoto = this.state.photos.length ;
      const curPage = (lastPhoto/10)+1;
      this.getPhotos(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  render() {
        // Additional css
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
      <div className="container">
        <div style={{ minHeight: "800px" }}>
          {this.state.photos.map(user => (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img src={user.previewURL} key={user.id} />
          ))}
        </div>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    );
  }
}

export default ScrollComponent;
