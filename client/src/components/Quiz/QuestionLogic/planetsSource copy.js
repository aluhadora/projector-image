import AvailableImages from '../../../AvailableImages.json';

export default function planetsSource({excludedAnswers}) {
    return AvailableImages.planets.filter(planet => planet.type === "planet" && !excludedAnswers.includes(planet));
}