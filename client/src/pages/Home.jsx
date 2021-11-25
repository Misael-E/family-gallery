import { useEffect, useState, useCallback } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";
import axios from "axios";

const Home = () => {
	const [photos, setPhotos] = useState();
	const [currentImage, setCurrentImage] = useState(0);
	const [viewerIsOpen, setViewerIsOpen] = useState(false);

	const fetchImages = async () => {
		axios
			.get(`${process.env.REACT_APP_HOST}/api/photos`)
			.then((result) => {
				const res = result.data;
				const photoData = res.map((obj) => ({
					src: obj.secure_url,
					width: obj.width,
					height: obj.height,
				}));
				setPhotos(photoData);
			})
			.catch((err) => console.log(err));
	};

	const openLightbox = useCallback((event, { photo, index }) => {
		setCurrentImage(index);
		setViewerIsOpen(true);
	}, []);

	const closeLightbox = () => {
		setCurrentImage(0);
		setViewerIsOpen(false);
	};

	useEffect(() => {
		fetchImages();
	}, []);

	return (
		<div className="gallery-container">
			{photos && (
				<>
					<Gallery photos={photos} onClick={openLightbox} />
					<ModalGateway>
						{viewerIsOpen ? (
							<Modal onClose={closeLightbox}>
								<Carousel
									currentIndex={currentImage}
									views={photos.map((x) => ({
										...x,
										srcset: x.srcSet,
										caption: x.title,
									}))}
								/>
							</Modal>
						) : null}
					</ModalGateway>
				</>
			)}
		</div>
	);
};

export default Home;
