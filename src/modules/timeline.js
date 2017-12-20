import React, { Component } from 'react';
import Axios from 'axios';
import dataPath from '../config/datapaths.json';
import moment from 'moment';
// require("moment/locale/zh-tw");
require("moment-duration-format");

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  getData() {
    var _this = this;
    Axios
      .get(dataPath.timeline)
      .then(function(res) {
        _this.setState({
          data: res.data
        }); //console.log(res)
      });
  }
  componentDidMount() {
    this.getData();
  }
  countDuration(_from, _to) {
    var fromMoment, toMoment, duration;
    const momentFormat = 'YYYY-MM';
    fromMoment = moment(_from, momentFormat);
    toMoment = moment(_to, momentFormat);
    fromMoment = fromMoment.isValid() ? fromMoment : moment();
    toMoment = toMoment.isValid() ? toMoment : moment();
    duration = moment.duration(toMoment.diff(fromMoment, "months") + 1, "months").format();
    return duration;
  }
  render() {
    return ( 
      <section className="timeline">
        {/*<h1>Timeline</h1><br/>*/}
        <div className="row">
          <div className="col-md-offset-1 col-md-10 col-lg-offset-2 col-lg-8">
            { this.state.data.reverse().map((perItem, idx)=>
              <div key={idx} className="timeline__part">
                <div className="timeline__duration">
                  <i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;
                  {perItem.duration.start} ~ {perItem.duration.end}
                  <small>{this.countDuration(perItem.duration.start, perItem.duration.end)}</small>
                </div>
                <div className="timeline__box">
                  <div className="row">
                    <div className="timeline__icon">
                      <i className={perItem.classIcon}>{perItem.textIcon}</i>
                    </div>
                    <div className="timeline__description">
                      <h3>{perItem.name}</h3>
                      <p>{perItem.job}</p>
                      <div className="timeline__tool">
                        <ul>
                          {perItem.tools.map((tool, idxTool)=>
                            <li key={idxTool}>{tool.name}</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="timeline__responsible">
                    <ul>
                      {perItem.responsible.map((responsible, idxTool)=>
                        <li key={idxTool}>{responsible}</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}