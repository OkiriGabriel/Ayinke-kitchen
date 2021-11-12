class MealStorage {
	static getMeals() {
		const meals = JSON.parse(localStorage.getItem("meals"));
		if (!meals) {
			localStorage.setItem("meals", JSON.stringify([]));
			return [];
		}
		return meals;
	}
	static addMeal({ id, name, price }) {
		let meals = JSON.parse(localStorage.getItem("meals"));
		const existingMeal = meals.find((meal) => Number(meal.id) === id);
		if (existingMeal) {
			existingMeal.quantity += 1;
			meals = meals.map((meal) => (meal.id === id ? existingMeal : meal));
		} else {
			console.log("else runs", existingMeal);
			meals.push({ id, quantity: 1, name, price });
		}
		localStorage.setItem("meals", JSON.stringify(meals));
		return meals;
	}

	static decrementMeal(id) {
		let meals = JSON.parse(localStorage.getItem("meals"));
		const existingMeal = meals.find((meal) => meal.id === id);
		if (existingMeal) {
			if (existingMeal.quantity > 1) {
				existingMeal.quantity -= 1;
				meals = meals.map((meal) => (meal.id === id ? existingMeal : meal));
			} else {
				meals = meals.filter((meal) => meal.id !== id);
			}
		}
		localStorage.setItem("meals", JSON.stringify(meals));
		return meals;
	}

	static removeMeal(id) {
		let meals = JSON.parse(localStorage.getItem("meals"));
		meals = meals.filter((meal) => meal.id !== id);
		localStorage.setItem("meals", JSON.stringify(meals));
		return meals;
	}
}

export default MealStorage;
