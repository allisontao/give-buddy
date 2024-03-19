"""
# The match charities algorithm takes the following parameters:
# charities: list of all charities in the database, each charity stores the information in a dictionary
# ft_ranking: financial transparency ranking specified by the user
# rr_ranking: results reporting ranking specified by the user
# ctc_ranking: cents to cause ranking specified by the user
# province: province the user lives in
# city: city the user lives in
# categories: list of categories user is interested in, defaults to empty list
# subcategories: list of subcategories user is interested in, defaults to empty list
"""

def generate_results(matched_charities):
    result_ids = []
    processed_ids = set()

    while matched_charities:
        # Iteration 1: Add the id with the highest score for each category
        for category, subcategories in matched_charities.items():
            if not any(subcategories.values()):
                continue

            max_score_id = max((item for sublist in subcategories.values() for item in sublist), key=lambda x: x[1], default=(None, 0))
            if max_score_id[0] is not None and max_score_id[0] not in processed_ids:
                result_ids.append(max_score_id[0])
                processed_ids.add(max_score_id[0])

        # Check if all subcategories have been processed
        if all(not any(subcategories.values()) for subcategories in matched_charities.values()):
            break

        # Iteration 2 and 3: Add the id with the highest score for each subcategory
        for category, subcategories in matched_charities.items():
            if not any(subcategories.values()):
                continue

            for subcategory, ids in subcategories.items():
                if not ids:
                    continue

                max_score_id = max(ids, key=lambda x: x[1], default=(None, 0))
                if max_score_id[0] is not None and max_score_id[0] not in processed_ids:
                    result_ids.append(max_score_id[0])
                    processed_ids.add(max_score_id[0])

        # Check if all subcategories have been processed before moving to Iteration 4
        if all(not any(subcategories.values()) for subcategories in matched_charities.values()):
            break

        # Iteration 4: Add the id with the next highest score in the same subcategory
        for category, subcategories in matched_charities.items():
            for subcategory, ids in subcategories.items():
                if not ids:
                    continue

                max_score_id = max(ids, key=lambda x: x[1], default=(None, 0))
                if max_score_id[0] is not None and max_score_id[0] not in processed_ids:
                    result_ids.append(max_score_id[0])
                    processed_ids.add(max_score_id[0])

        # Remove processed ids from the data structure
        for category, subcategories in matched_charities.items():
            for subcategory, ids in subcategories.items():
                matched_charities[category][subcategory] = [(item[0], item[1]) for item in ids if item[0] not in processed_ids]

        # Remove empty subcategories and categories
        matched_charities = {category: subcategories for category, subcategories in matched_charities.items() if any(subcategories.values())}

        # Handle the case where all subcategories within a category have already been added
        for category, subcategories in matched_charities.items():
            if all(not ids for ids in subcategories.values()):
                all_ids = [item for sublist in subcategories.values() for item in sublist]
                max_score_id = max(all_ids, key=lambda x: x[1], default=(None, 0))
                if max_score_id[0] is not None and max_score_id[0] not in processed_ids:
                    result_ids.append(max_score_id[0])
                    processed_ids.add(max_score_id[0])

    return result_ids


def match_charities(charities, ft_ranking, rr_ranking, ctc_ranking, province=None, city=None, user_categories=[], user_subcategories=[]):
    matched_charities = {}
    province_matched_charities = {}
    non_matched_charities = {}
    ranking_map = {1: 1.5, 2: 1.0, 3: 0.5}
    user_subcategories = [x.lower().strip() for x in user_subcategories]
    
    ft_ranking_weight = ranking_map[ft_ranking]
    rr_ranking_weight = ranking_map[rr_ranking]
    ctc_ranking_weight = ranking_map[ctc_ranking]

    for charity in charities:
        category = charity['main_category']
        subcategory_list = [x.lower().strip() for x in charity['sub_category'].split(', ')]

        score = (
            ft_ranking_weight * charity['financial_transparency'] +
            rr_ranking_weight * charity['results_reporting'] +
            ctc_ranking_weight * charity['cents_to_cause']
        )
        charity_id = charity['charity_id']
        charity_tuple = (charity_id, score)

        # Check if province matches
        if province.lower().strip() == charity['province'].lower().strip():
            # Check if city matches
            if city and city.lower().strip() == charity.get('city', '').lower().strip():
                if category not in matched_charities:
                    matched_charities[category] = {}
                
                if not user_categories or category in user_categories:
                    if not user_subcategories or set(user_subcategories) & set(subcategory_list):
                        if set(user_subcategories) & set(subcategory_list):
                            common_subcategories = set(user_subcategories) & set(subcategory_list)
                            for subcategory in common_subcategories:
                                matched_charities[category].setdefault(subcategory, []).append(charity_tuple)
                        else:
                            for subcategory in subcategory_list:
                                matched_charities[category].setdefault(subcategory, []).append(charity_tuple)
            else:  # Province matches but city doesn't
                if category not in province_matched_charities:
                    province_matched_charities[category] = {}
                
                if not user_categories or category in user_categories:
                    if not user_subcategories or set(user_subcategories) & set(subcategory_list):
                        if set(user_subcategories) & set(subcategory_list):
                            common_subcategories = set(user_subcategories) & set(subcategory_list)
                            for subcategory in common_subcategories:
                                province_matched_charities[category].setdefault(subcategory, []).append(charity_tuple)
                        else:
                            for subcategory in subcategory_list:
                                province_matched_charities[category].setdefault(subcategory, []).append(charity_tuple)
        else:  # Province doesn't match
            if category not in non_matched_charities:
                non_matched_charities[category] = {}
                
            if not user_categories or category in user_categories:
                if not user_subcategories or set(user_subcategories) & set(subcategory_list):
                    if set(user_subcategories) & set(subcategory_list):
                        common_subcategories = set(user_subcategories) & set(subcategory_list)
                        for subcategory in common_subcategories:
                            non_matched_charities[category].setdefault(subcategory, []).append(charity_tuple)
                    else:
                        for subcategory in subcategory_list:
                            non_matched_charities[category].setdefault(subcategory, []).append(charity_tuple)

    # Combine matching city, matching province, and non-matching charities in the result
    res = generate_results(matched_charities)
    res.extend(generate_results(province_matched_charities))
    res.extend(generate_results(non_matched_charities))

    return res


def main():
    categories = ['animals']
    subcategories = ['welfare']
    ft_ranking = 1
    rr_ranking = 2
    ctc_ranking = 3
    charities = [{'charity_id': 1, 'main_category': 'animals', 'sub_category': 'welfare', 'financial_transparency': 100, 'results_reporting': 50, 'cents_to_cause': 100, 'province': 'BC'},
                {'charity_id': 2, 'main_category': 'animals', 'sub_category': 'welfare', 'financial_transparency': 100, 'results_reporting': 0, 'cents_to_cause': 100, 'province': 'ON', 'city': 'toronto'},
                {'charity_id': 3, 'main_category': 'animals', 'sub_category': 'welfare, adoption', 'financial_transparency': 100, 'results_reporting': 100, 'cents_to_cause': 100, 'province': 'ON', 'city': 'richmond hill'}]
    print(match_charities(charities, ft_ranking, rr_ranking, ctc_ranking, user_categories=categories, user_subcategories=subcategories, province="QC", city="vancouver"))
    pass

if __name__ == "__main__":
    main()
