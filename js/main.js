import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/10c6f23fb798283ee3766e51593abe48/raw/a5865e93b1b632b06899a423bac779b1f7c8eeee/stats-preview-data.json';

const cardWrapperEl = document.querySelector('.card-wrapper');
const cardTemplate = document.getElementById('card-template');
const cardImageTemplate = document.getElementById('card-image-template');
const cardStatusItemTemplate = document.getElementById(
	'card-stat-item-template'
);
const cardContentTemplate = document.getElementById('card-content-template');
const loadingEl = document.querySelector('.loading');

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardWrapperEl.appendChild(errorEl);
};

const renderCardContent = (data) => {
	const { title, description, image, statuses } = JSON.parse(data);

	const cardTemplateNode = document.importNode(cardTemplate.content, true);
	const cardEl = cardTemplateNode.querySelector('.card');

	/* [card image] */
	const cardImageTemplateNode = document.importNode(
		cardImageTemplate.content,
		true
	);
	const cardImageEl = cardImageTemplateNode.querySelector('.card__image img');
	cardImageEl.src = './images/' + image.source;
	cardImageEl.alt = image.alt;

	/* [card content] */
	const cardContentTemplateNode = document.importNode(
		cardContentTemplate.content,
		true
	);
	const cardContentEl =
		cardContentTemplateNode.querySelector('.card__content');

	const cardTitleEl = cardContentEl.querySelector('.card__title');
	cardTitleEl.textContent = title;

	const cardDescriptionEl = cardContentEl.querySelector('.card__desc');
	cardDescriptionEl.textContent = description;

	const cardStatusListEl = cardContentEl.querySelector('.card__stats-list');

	for (const status of statuses) {
		const { label, amount } = status;

		const cardStatusItemTemplateNode = document.importNode(
			cardStatusItemTemplate.content,
			true
		);
		const cardStatusItemEl = cardStatusItemTemplateNode.querySelector(
			'.card__stats-list-item'
		);

		const cardStatusItemAmountEl = cardStatusItemEl.querySelector('.num');
		cardStatusItemAmountEl.textContent = amount;

		const cardStatusItemLabelEl = cardStatusItemEl.querySelector('.label');
		cardStatusItemLabelEl.textContent = label;

		cardStatusListEl.appendChild(cardStatusItemTemplateNode);
	}

	/* [init] */
	removeLoading();
	cardEl.appendChild(cardImageTemplateNode);
	cardEl.appendChild(cardContentTemplateNode);
	cardWrapperEl.appendChild(cardTemplateNode);
};

sendHttpRequest('GET', URL, renderCardContent, handleError);
