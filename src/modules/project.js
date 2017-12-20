import React, { Component } from 'react';
import Axios from 'axios';
// import Slick from './fadeSlick';
import Slick from 'react-slick';
import LightDialog from './lightDialog';
import dataPath from '../config/datapaths.json';

export default class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  getData() {
    var _this = this;
    Axios
      .get(dataPath.project)
      .then(function(res) {
        _this.setState({
            data: res.data
        }); //console.log(res)
      });
  }
  componentDidMount() {
    this.getData();
  }
  previewShow(perItem) {
    // console.log(perItem)
    return perItem.gallery.map((gallery, idx)=>
      { if(idx === 0) {
          return (
            <div className="project__preview-body" key={idx.toString()}>
              <figure>
                <img src={gallery.src} alt={gallery.alt}/>
              </figure>
              <figcaption>
                {perItem.name}<br />
                <small>{(perItem.timeDuration && perItem.timeDuration.start) ? perItem.timeDuration.start+'-'+perItem.timeDuration.end : ""}</small>
              </figcaption>
            </div>
        )}
        else { return "" }
      }
    )
  }
  slickDotsShow(itemsCount, slidesToShow) {
    return (itemsCount > slidesToShow) ? true : false;
  }
  renderTimeDuration(timeDuration) {
    if (timeDuration && timeDuration.start) {
      return (
        <div className="project__tool-timeDuration">
          <i className="ion-clock"></i>
          {timeDuration.start}-{timeDuration.end}
        </div>
      );
    }
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      zIndex: 2
    };
    // if(this.init) {
    //   this.getData();
    //   this.init = false;
    // }
    return (
      <section className="project">
        <h1>Projects</h1><br/>
        <div className="row">
          { this.state.data.map((perItem) =>
            <div key={perItem.idx.toString()} className="project__item col-xs-12 col-sm-6 col-md-4">
              <a href="#" 
                 onClick={(e) => perItem.dialog.showHideLightDialog(e, 'open')} 
                 className="project__preview">
                 {this.previewShow(perItem)}
              </a>
              <LightDialog ref={instance => { perItem.dialog = instance; }}>
                <div className="project__detail">
                  <Slick {...settings}
                      // 在1個以上的輪播才顯示dots
                      dots={ this.slickDotsShow(perItem.gallery.length, settings.slidesToShow) }
                  >
                    {perItem.gallery.map((gallery, idx)=>
                      <div className="gallery" key={idx.toString()}>
                        <figure>
                          <img src={gallery.src} alt={gallery.alt}/>
                        </figure>
                      </div>
                    )}
                  </Slick>
                  <h4 className="project__name">
                    {perItem.name} &nbsp;
                    <small>{(perItem.timeDuration && perItem.timeDuration.start) ? perItem.timeDuration.start+'-'+perItem.timeDuration.end : ""}</small>
                  </h4>
                  { perItem.tools.map((tool, idx) =>
                    <div className="project__tool" key={idx.toString()}>
                      <div className="project__tool-name"><i className="ion-wrench"></i>{tool.name}</div>
                      { this.renderTimeDuration(tool.timeDuration) }
                      <div className="project__tool-description">{tool.description}</div>
                    </div>
                  )}
                  { perItem.responsible ? 
                    <div className="project__responsible">
                      <ul>
                        { perItem.responsible.map((res, idx) =>
                          <li key={idx}>{ res }</li>
                        )}
                      </ul>
                    </div>
                    : null
                  }
                </div>
              </LightDialog>
            </div>
          )}
        </div>
      </section>
    );
  }
}