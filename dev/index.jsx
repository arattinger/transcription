import React from "react";
import ReactDOM from "react-dom";

function Word(props) {
  if(positionEqual(props.currentPos, props.position)) {
  	return (<span className="marked">{props.value}</span>);
  } else {
  	return (<span>{props.value}</span>);
  }
}

class Sentence extends React.Component {
	render() {
		const words = this.props.sentence.map((step, move) => {
			const currentPos = [move, this.props.currentSentence];
			return (
				<Word 
					key={move} 
					value={step} 
					position={this.props.position} 
					currentPos={currentPos} />
			);
		});
		if(this.props.currentSentence == this.props.position[1]) {
    		return (<div className="sentence current-sentence">{words}</div>);
		} else {
			return (<div className="sentence">{words}</div>);
		}
	}
}

class Transcription extends React.Component {
	constructor() {
		super();
		this.state = {
			position: [0, 0], // vertical, horizontal
			sentences: [
				["hey", "this", "is", "a", "render", "test"],
				["what", "else", "do", "you", "want", "to", "know", "?"],
			]
		};
		// This binding is necessary to make `this` work in the callback
		this.handleKeyInput = this.handleKeyInput.bind(this);
	}

	updatePosition(keyCode) {
		const pos = this.state.position.slice(0);

		if(keyCode == 37) { // left
			pos[0] -= 1;
		} else if(keyCode == 39) { // right
			pos[0] += 1;
		} else if(keyCode == 38) { // up
			pos[1] -= 1;
		} else if(keyCode == 40) { // down
			pos[1] += 1;
		}

		this.setState({
			position: pos,
		});
	}

	handleKeyInput(event) {
		this.updatePosition(event.keyCode);
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyInput, false);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.handleKeyInput, false);
	}

	render() {
		const sentences = this.state.sentences;
		const lines = sentences.map((step, move) => {
			return (<Sentence key={move} sentence={step} currentSentence={move} position={this.state.position} />);
		});

    	return (
    		<div>{lines}</div>
    	);
    }
}

ReactDOM.render(
  <Transcription />,
  document.getElementById('container')
);

function positionEqual(pos1, pos2) {
	if(pos1[0] == pos2[0] && pos1[1] == pos2[1]) {
		return true;
	}
	return false;
}
