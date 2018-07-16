import React, {Component} from 'react';
import './VisualRecognitionContainer.css';

class VisualRecognitionContainer extends Component {

    constructor (props) {
        super(props);
        this.state = {
            url: null,
            images: null,
            translationText: null,
            audioText: null,
            translation:null,
            audio: 'https://3m-mike-dev-test.mybluemix.net/audio-api?text='
        };

        this.listResults= this.listResults.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getImages = this.getImages.bind(this);
        this.updateTranslationPhrase = this.updateTranslationPhrase.bind(this);
        this.updateAudioPhrase = this.updateAudioPhrase.bind(this);
        this.getTranslation = this.getTranslation.bind(this);
        this.getAudio = this.getAudio.bind(this);
        this.playAudio = this.playAudio.bind(this);
    }

    handleChange({target}) {
        this.setState ({
            url:target.value
        })
    }

    listResults = () => {
        const images = this.state.images.map((image, index) => {
            return <li key={index}>Class: {image.class}, Score: {image.score}</li>
        });
        return images
    };

    updateTranslationPhrase ({target}) {
        this.setState ({
            translationText: target.value
        })
    }

    updateAudioPhrase ({target}) {
        this.setState ({
            audioText: target.value
        })
    }

    getTranslation  = () => {
        fetch('https://3m-mike-dev-test.mybluemix.net/translation-api?text=' + this.state.translationText)
            .then(response => response.json())
            .then(
                json => {
                    this.setState({
                        translation: json.translation
                    });
                }
            )
            .catch(err => console.log(err));
    };

    getAudio  = () => {
        this.setState({audio: 'https://3m-mike-dev-test.mybluemix.net/audio-api?text=' + this.state.audioText});
    };

    getImages = () => {

        fetch('https://3m-mike-dev-test.mybluemix.net/visual-api?imageurl=' + this.state.url)
            .then(response => response.json())
            .then(
                json => {
                    this.setState({
                        images: json.classifiers[0].classes
                    });
                }
            )
            .catch(err => console.log(err));
    };

    playAudio = () => {
        const styles = {
            display: 'none'
        };
        return (
            <audio controls autoPlay style={styles}>
                <source src={this.state.audio} type="audio/wav" />
            </audio>
        )
    };

    handleAudioKeyPress (key) {
        if (key.key === 'Enter') {
            this.getAudio();
        }
    }

    handleTranslationKeyPress (key) {
        if (key.key === 'Enter') {
            this.getTranslation();
        }
    }

    handleImageKeyPress (key) {
        if (key.key === 'Enter') {
            this.getImages();
        }
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>IBM Watson English = > French Translator</h1>
                    </div>
                </div>
                <div className="col input-img-url">
                    <input onKeyPress={e =>this.handleTranslationKeyPress(e)} onChange={this.updateTranslationPhrase} placeholder="Put some English text to be translated into French"/>
                    <button onClick={this.getTranslation}>Translate</button>
                </div>
                <div className="row">
                    <div className="col">
                        <h4>{this.state.translation ? this.state.translation: null}</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h1>IBM Watson TEXT = > Audio</h1>
                    </div>
                </div>
                <div className="col input-img-url">
                    <input onKeyPress={e =>this.handleAudioKeyPress(e)} onChange={this.updateAudioPhrase} placeholder="Put some English text to be converted into an audio file"/>
                    <button onClick={this.getAudio}>Speak</button>
                </div>
                <div className="row">
                    <div className="col">
                        {this.state.audio.indexOf(this.state.audioText) >= 0 ? this.playAudio(): null}
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h1>IBM Watson Visual Recognition</h1>
                    </div>
                    <div className="col input-img-url">
                        <input onKeyPress={e =>this.handleImageKeyPress(e)} onChange={this.handleChange} placeholder="Put an image URL here"/>
                        <button onClick={this.getImages}>Analyze</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <img className="img-responsive" src={this.state.images ? this.state.url: "" }/>
                        <ul>
                            {this.state.images ? this.listResults(): null}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default VisualRecognitionContainer;