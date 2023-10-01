def match_charities(ft_ranking, rr_ranking, ctc_ranking, charities, categories = [], subcategories = []):
    ranking_map = {1: 1.5, 2: 1.0, 3: 0.5}
    matched_charities = []
    # {charity id : score}
    charity_scores = {}
    ft_ranking_weight = ranking_map[ft_ranking]
    rr_ranking_weight = ranking_map[rr_ranking]
    ctc_ranking_weight = ranking_map[ctc_ranking]
    
    # if the user did not choose any categories, all charities are matched charities
    if len(categories) == 0 and len(subcategories) == 0:
        matched_charities = charities
    
    else:
        for charity in charities:
            # go to next charity if categories don't match
            if charity['category'] not in categories:
                continue
            # if the user didn't choose any subcategories, all matching categories are matched charities
            if len(subcategories) == 0:
                matched_charities.append(charity)
            else:
                subcategory_list = charity['subcategory'].split(',')
                charity_subcategory_set = set(subcategory_list)
                user_subcategory_set = set(subcategories)
                # if they don't have any elements in common
                if not (charity_subcategory_set & user_subcategory_set):
                    continue
                matched_charities.append(charity)
        
    for charity in matched_charities:
        score = ft_ranking_weight*charity['financial_transparency_score'] + rr_ranking_weight*charity['results_reporting_score'] + ctc_ranking_weight*charity['cents_to_cause_score']
        charity_scores[charity['id']] = score

    # return list of charity ids in the sorted order of matches
    sorted_matches = sorted(charity_scores, key=charity_scores.get, reverse=True)
    return sorted_matches
    
def main():
    # categories = ['animals']
    # subcategories = ['cancer', 'welfare']
    # ft_ranking = 1
    # rr_ranking = 2
    # ctc_ranking = 3
    # charities = [{'id': 1, 'category': 'health', 'subcategory': 'cancer', 'financial_transparency_score': 100, 'results_reporting_score': 50, 'cents_to_cause_score': 100},
    #             {'id': 2, 'category': 'animals', 'subcategory': 'welfare', 'financial_transparency_score': 100, 'results_reporting_score': 0, 'cents_to_cause_score': 100},
    #             {'id': 3, 'category': 'animals', 'subcategory': 'welfare,cancer', 'financial_transparency_score': 100, 'results_reporting_score': 100, 'cents_to_cause_score': 100}]
    # print(match_charities(ft_ranking, rr_ranking, ctc_ranking, charities, categories))
    
    pass

if __name__ == "__main__":
    main()
