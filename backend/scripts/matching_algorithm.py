"""
The match charities algorithm takes the following parameters:
charities: list of all charities in the database, each charity stores the information in a dictionary
ft_ranking: financial transparency ranking specified by the user
rr_ranking: results reporting ranking specified by the user
ctc_ranking: cents to cause ranking specified by the user
province: province the user lives in, if the user does not care about donating within the province this is None
city: city the user lives in, if the user does not care about donating within the city this is None
categories: list of categories user is interested in, defaults to empty list
subcategories: list of subcategories user is interested in, defaults to empty list
"""
def match_charities(charities, ft_ranking, rr_ranking, ctc_ranking, province = None, city = None , categories = [], subcategories = []):
    ranking_map = {1: 1.5, 2: 1.0, 3: 0.5}
    matched_charities = []
    subcategories = [x.lower().strip() for x in subcategories]
    # {charity id : score}
    charity_scores = {}
    ft_ranking_weight = ranking_map[ft_ranking]
    rr_ranking_weight = ranking_map[rr_ranking]
    ctc_ranking_weight = ranking_map[ctc_ranking]
    
    for charity in charities:
        # go to next charity of province doesn't match
        if province != "" and charity['province'].lower() != province.lower():
            continue
        # go to next charity if city doesn't match
        if city != "" and charity['city'].lower()  != city.lower():
            continue
        # if the user didn't choose any categories, all categories are matched charities
        if len(categories) == 0:
            matched_charities.append(charity)
            continue
        # go to next charity if categories don't match
        if charity['main_category'] not in categories:
            continue
        # if the user didn't choose any subcategories, all subcategories are matched charities
        if len(subcategories) == 0:
            matched_charities.append(charity)
        else:
            subcategory_list = charity['sub_category'].strip().lower().split(', ')
            charity_subcategory_set = set(subcategory_list)
            user_subcategory_set = set(subcategories)
            # if they don't have any elements in common
            if not (charity_subcategory_set & user_subcategory_set):
                continue
            matched_charities.append(charity)
        
    for charity in matched_charities:
        score = ft_ranking_weight*charity['financial_transparency'] + rr_ranking_weight*charity['results_reporting'] + ctc_ranking_weight*charity['cents_to_cause']
        charity_scores[charity['charity_id']] = score

    # return list of charity ids in the sorted order of matches
    sorted_matches = sorted(charity_scores, key=charity_scores.get, reverse=True)
    return sorted_matches
    
def main():
    # categories = ['animals']
    # subcategories = ['Cancer', 'welfare']
    # ft_ranking = 1
    # rr_ranking = 2
    # ctc_ranking = 3
    # charities = [{'charity_id': 1, 'main_category': 'health', 'sub_category': 'Cancer', 'financial_transparency': 100, 'results_reporting': 50, 'cents_to_cause': 100, 'province': 'BC', 'city': 'toronto'},
    #             {'charity_id': 2, 'main_category': 'animals', 'sub_category': 'welfare', 'financial_transparency': 100, 'results_reporting': 0, 'cents_to_cause': 100, 'province': 'ON', 'city': 'markham'},
    #             {'charity_id': 3, 'main_category': 'animals', 'sub_category': 'welfare,cancer', 'financial_transparency': 100, 'results_reporting': 100, 'cents_to_cause': 100, 'province': 'ON', 'city': 'richmond hill'}]
    # print(match_charities(charities, ft_ranking, rr_ranking, ctc_ranking, province = 'ON', categories=categories, subcategories=subcategories))
    pass

if __name__ == "__main__":
    main()
