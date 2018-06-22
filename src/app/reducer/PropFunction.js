import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./reducer";
import VisualRecognitionContainer from "../container/VisualRecognitionContainer";

function mapStateToProps (state) {
    const {fetchURL} = state;
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps) (VisualRecognitionContainer);