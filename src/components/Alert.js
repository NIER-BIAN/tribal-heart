import { Component } from 'react';

// Alert superclass: holds the logic of a generic alert
class Alert extends Component {
    
    constructor(props) {
	super(props);
	this.color = null;
	this.bgColor = null;
    }

    getStyle = () => {
	return {
	    color: this.color,
	    backgroundColor: this.bgColor,
	    borderWidth: "2px",
	    borderStyle: "solid",
	    fontWeight: "bolder",
	    borderRadius: "7px",
	    borderColor: this.color,
	    textAlign: "center",
	    fontSize: "12px",
	    margin: "10px 0",
	    padding: "10px"
	};
    }

    render() {
	return (
		<div className="Alert">
		  <p style={this.getStyle()}>{this.props.text}</p>
		</div>
	);
    }
}

// InfoAlert subclass
class InfoAlert extends Alert {
    // overwrite color in subclass constructor
    constructor(props) {
	super(props);
	this.color = 'rgb(0, 0, 255)';       // blue
	this.bgColor = 'rgb(220, 220, 255)'; // pale blue
    }
    // no need to repeat code for getStyle and render
}

/*
// WarningAlert subclass
class WarningAlert extends Alert {
    constructor(props) {
	super(props);
    }
}
*/

// ErrorAlert subclass
class ErrorAlert extends Alert {
    constructor(props) {
	super(props);
	this.color = 'rgb(255, 0, 0)';       // red
	this.bgColor = 'rgb(225, 220, 220)'; // pale pink
    }
}

export { InfoAlert, ErrorAlert };
