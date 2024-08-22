
input_df = """
# Define the data for the DataFrame
sample_input_data = [
    (1, "Amazing Adventure", "Action", 2020, 120, 2500000),
    (2, "Sci-fi World", "Sci-fi", 2018, 140, 800000),
    (3, "Mysterious Island", "Drama", 2022, 115, 1500000),
    (4, "Uncharted Realms", "Action", 2019, 134, 3200000),
    (5, "Journey to the Stars", "Sci-fi", 2021, 128, 1100000)
]
"""

expected_df = """
# Define the data for the DataFrame
sample_final_data = [
    (1, "Amazing Adventure", "Action", 2020, 120, 2500000),
    (2, "Sci-fi World", "Sci-fi", 2018, 140, 800000),
    (3, "Mysterious Island", "Drama", 2022, 115, 1500000),
    (4, "Uncharted Realms", "Action", 2019, 134, 3200000),
    (5, "Journey to the Stars", "Sci-fi", 2021, 128, 1100000)
]

"""

sample_solution_json = """
expected_json_data =  [
    {
        "duration": 115,
        "genre": "Drama",
        "release_year": 2022,
        "title": "Mysterious Island",
        "video_id": 3,
        "view_count": 1500000
    },{
        "duration": 120,
        "genre": "Action",
        "release_year": 2020,
        "title": "Amazing Adventure",
        "video_id": 1,
        "view_count": 2500000
    },{
        "duration": 128,
        "genre": "Sci-fi",
        "release_year": 2021,
        "title": "Journey to the Stars",
        "video_id": 5,
        "view_count": 1100000
    },{
        "duration": 134,
        "genre": "Action",
        "release_year": 2019,
        "title": "Uncharted Realms",
        "video_id": 4,
        "view_count": 3200000
    }
]"""

sample_input_json = """
input_json_data = [
    {
        "video_id": 1,
        "title": "Amazing Adventure",
        "genre": "Action",
        "release_year": 2020,
        "duration": 120,
        "view_count": 2500000
    },
    {
        "video_id": 2,
        "title": "Sci-fi World",
        "genre": "Sci-fi",
        "release_year": 2018,
        "duration": 140,
        "view_count": 800000
    },
    {
        "video_id": 3,
        "title": "Mysterious Island",
        "genre": "Drama",
        "release_year": 2022,
        "duration": 115,
        "view_count": 1500000
    },
    {
        "video_id": 4,
        "title": "Uncharted Realms",
        "genre": "Action",
        "release_year": 2019,
        "duration": 134,
        "view_count": 3200000
    },
    {
        "video_id": 5,
        "title": "Journey to the Stars",
        "genre": "Sci-fi",
        "release_year": 2021,
        "duration": 128,
        "view_count": 1100000
    }
]
"""