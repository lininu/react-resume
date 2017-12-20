import React, { Component } from 'react'
import classnames from 'classnames'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fixed: false,
            style: {},
            styleBox: {},
            timmer: {},
            profileBoxElementHeight: 0,
            profileElementOffsetTop: 0
        }
        this.timmer = this.timmer
    }
    componentDidMount() {
      window.addEventListener('scroll', e => this.handleScroll(e, this))

      this.setState({
        profileBoxElementHeight: (this.profileBoxElement.scrollHeight - 75),
        profileElementOffsetTop: this.profileElement.offsetTop
      })
    };
    componentWillUnmount() {
      window.removeEventListener('scroll', e => this.handleScroll(e, this))
    };
    handleScroll(event, profileComponent) {
        let doc = document.documentElement
        // let left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
        let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)

        let newStyle = (top + 20) > this.state.profileElementOffsetTop ? {
                fixed: true,
                style: { height: this.state.profileBoxElementHeight },
                styleBox: {  }
            } : { fixed: false, style: {}, styleBox: {} }

        profileComponent.timmer = setTimeout(e=>{
            clearTimeout(profileComponent.timmer)
            profileComponent.setState(newStyle)            
        }, 0);

        // console.log(profileComponent.profileElement.offsetTop, profileComponent.profileBoxElement.)
    };
	render() {
		return (
			<section ref={ref=>this.profileElement = ref} className={classnames({
                profile: true,
                profile__fixed: this.state.fixed
            })} style={this.state.style}>
                <div ref={ref=>this.profileBoxElement = ref} className="profile__box" style={this.state.styleBox}>
                    <div className="container">
                        <div className="profile__img">
                            <img className="img-circle" src="https://i.imgur.com/lZmzJac.jpg" alt=""/>
                        </div> 
                        <h3 className="text-center">Inu Lin</h3>
                        <div className="profile__detail">
                            <div className="profile__links">
                                <ul>
                                    <li><a href="https://lininu.blogspot.tw" title="Inu's coding note"><i className="ion-android-home"></i></a></li>
                                    <li><a href="https://www.linkedin.com/in/inulin/" title="LinkedIn"><i className="ion-social-linkedin"></i></a></li>
                                    <li><a href="https://github.com/lininu" title="GitHub"><i className="ion-social-github"></i></a></li>
                                    <li><a href="mailto:inuworks@gmail.com" title="Email"><i className="ion-ios-email-outline"></i></a></li>
                                </ul>
                            </div>
                            <div className="profile__intro">
                                <ul>
                                    <li>Front End Engineer</li>
                                    <li>Graduated from Soochow University</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
		)
	}
}