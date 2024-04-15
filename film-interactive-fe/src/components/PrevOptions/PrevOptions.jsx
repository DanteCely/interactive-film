import clsx from 'clsx';
import { Button } from '../';
import { useScenes, goToPrevScene } from '../../contexts/SceneManager';

const PrevScene = ({ poster, className, text, id }) => {
	const [state, dispatch] = useScenes();

	const onClick = () => {
		goToPrevScene(id, dispatch);
	};

	return (
		<Button onClick={onClick} className={className}>
			<img src={poster.src} />
			<div />
			<p>{text}</p>
		</Button>
	);
};

const namespace = 'prev-options';
const namespacePoster = `${namespace}__poster`;
const namespaceTitle = `${namespace}__title`;
const namespaceScenes = `${namespace}__scenes`;

export const PrevOptions = (props) => {
	const { options, className } = props;

	return (
		<article className={clsx(namespace, className)}>
			<h2 className={namespaceTitle}>Escenas previas</h2>
			<div className={namespaceScenes}>
				{options.map((option) => {
					return <PrevScene key={option.id} className={namespacePoster} {...option} />;
				})}
			</div>
		</article>
	);
};
