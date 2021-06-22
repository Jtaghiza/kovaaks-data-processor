import PropTypes from "prop-types";
import {observer} from "mobx-react-lite";
import {useState} from "react";
import ProgressDrawer from "../ProgressDrawer/ProgressDrawer";
import Badge from "../Badge/Badge";


const ProgressBar = observer((props) => {
    const [isOpen, toggleOpen] = useState(false);

    const reqs = props.reqs.scenarioList.find(s => s.name === props.scenario).reqs;
    const highScore = props.scores?.map((score) => score.Score).reduce((acc, curr) => curr > acc ? curr : acc);
    const [nextRank, nextRankReq] = highScore > 0 ?
        Object.entries(reqs).find(req => req[1] > highScore) || ["max", highScore]
        : ["silver", reqs["silver"]];
    const [currentRank, currentRankReq] = Object.entries(reqs).filter(req => req[1] <= highScore).pop() || ["unranked", 0];
    const percentToLevel = 100 * (highScore / nextRankReq) || 0

    return (
        <div className="bg-gray-200 p-1 rounded-lg shadow-navigation">
            <div className="flex cursor-pointer" onClick={() => toggleOpen(!isOpen)}>
                <Badge rank={currentRank} req={currentRankReq.toString()} rounding={'rounded-l-lg'}/>
                <div className="w-full relative">
                    <div style={{width: percentToLevel + "%"}}
                        className={`absolute top-0 left-0 h-full bg-${currentRank}`}/>
                    <div className="relative ml-2">
                        <div>{props.scenario}</div>
                        <div className="text-xs ml-1">{highScore} ({percentToLevel.toFixed(1)}%)</div>
                    </div>
                </div>
                <Badge rank={nextRank} req={nextRankReq.toString()} rounding={'rounded-r-lg'}/>
            </div>
            {isOpen && <ProgressDrawer scores={props.scores}/>}
        </div>
    )
});

ProgressBar.propTypes = {
    scenario: PropTypes.string,
    scores: PropTypes.array
};

export default ProgressBar;
