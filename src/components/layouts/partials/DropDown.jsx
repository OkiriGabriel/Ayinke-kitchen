import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import DropSelect from "../search/DropSelect";

const DropDown = ({
	options,
	className,
	selected,
	defaultValue,
	placeholder,
	search,
	image,
	displayLeft,
	disabled,
}) => {
	const onSelectChange = (sel) => {
		selected(sel);
	};

	const getOptions = () => {
		const op = options().map((item) => {
			let c = {
				value: item.value,
				label: item.label,
				left: item.left,
				image: item.image,
			};
			return c;
		});

		return op;
	};

	const getDefault = () => {
		if (defaultValue && typeof defaultValue === "object") {
			return defaultValue;
		} else if (defaultValue && typeof defaultValue === "number") {
			return options ? options()[defaultValue] : options()[0];
		} else {
			return;
		}
	};

	return (
		<>
			<DropSelect
				isSearchable={search === undefined ? false : search}
				disableSeparator={true}
				className={className ? className + " font-metromedium" : ""}
				controlDisplayImage={image ? true : false}
				controlDisplayLabel={true}
				controlDisplayLeft={false}
				optionDisplayLeft={displayLeft ? true : false}
				optionDisplayImage={image ? true : false}
				defaultValue={getDefault()}
				options={getOptions}
				onChange={(item) => onSelectChange(item)}
				placeholder={placeholder ? placeholder : "Select option"}
				isDisabled={disabled ? disabled : false}
			/>
		</>
	);
};

export default DropDown;
