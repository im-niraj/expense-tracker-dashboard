let singleDigit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let jodiDigit = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
];
let singlePana = [
    120, 123, 124, 125, 126, 127, 128, 129, 130, 134, 135, 136, 137, 138, 139, 140, 145, 146, 147, 148, 149, 150, 156, 157, 158, 159, 160, 167, 168, 169, 170, 178, 179, 180, 189, 190, 230, 234, 235,
    236, 237, 238, 239, 240, 245, 246, 247, 248, 249, 250, 256, 257, 258, 259, 260, 267, 268, 269, 270, 278, 279, 280, 289, 290, 340, 345, 346, 347, 348, 349, 350, 356, 357, 358, 359, 360, 367, 368,
    369, 370, 378, 379, 380, 389, 390, 450, 456, 457, 458, 459, 460, 467, 468, 469, 470, 478, 479, 480, 489, 490, 560, 567, 568, 569, 570, 578, 579, 580, 589, 590, 670, 678, 679, 680, 689, 690, 780,
    789, 790, 890,
];
let doublePana = [
    100, 110, 112, 113, 114, 115, 116, 117, 118, 119, 122, 133, 144, 155, 166, 177, 188, 199, 200, 220, 223, 224, 225, 226, 227, 228, 229, 233, 244, 255, 266, 277, 288, 299, 300, 330, 334, 335, 336,
    337, 338, 339, 344, 355, 366, 377, 388, 399, 400, 440, 445, 446, 447, 448, 449, 455, 466, 477, 488, 499, 500, 550, 556, 557, 558, 559, 566, 577, 588, 599, 600, 660, 667, 668, 669, 677, 688, 699,
    700, 770, 778, 779, 788, 799, 800, 880, 889, 899, 900, 990,
];
let tripplePana = ["000", 111, 222, 333, 444, 555, 666, 777, 888, 999];

let panna = [
    "000",
    100,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    122,
    123,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    133,
    134,
    135,
    136,
    137,
    138,
    139,
    140,
    144,
    145,
    146,
    147,
    148,
    149,
    150,
    155,
    156,
    157,
    158,
    159,
    160,
    166,
    167,
    168,
    169,
    170,
    177,
    178,
    179,
    180,
    188,
    189,
    190,
    199,
    200,
    220,
    222,
    223,
    224,
    225,
    226,
    227,
    228,
    229,
    230,
    233,
    234,
    235,
    236,
    237,
    238,
    239,
    240,
    244,
    245,
    246,
    247,
    248,
    249,
    250,
    255,
    256,
    257,
    258,
    259,
    260,
    266,
    267,
    268,
    269,
    270,
    277,
    278,
    279,
    280,
    288,
    289,
    290,
    299,
    300,
    330,
    333,
    334,
    335,
    336,
    337,
    338,
    339,
    340,
    344,
    345,
    346,
    347,
    348,
    349,
    350,
    355,
    356,
    357,
    358,
    359,
    360,
    366,
    367,
    368,
    369,
    370,
    377,
    378,
    379,
    380,
    388,
    389,
    390,
    399,
    400,
    440,
    444,
    445,
    446,
    447,
    448,
    449,
    450,
    455,
    456,
    457,
    458,
    459,
    460,
    466,
    467,
    468,
    469,
    470,
    477,
    478,
    479,
    480,
    488,
    489,
    490,
    499,
    500,
    550,
    555,
    556,
    557,
    558,
    559,
    560,
    566,
    567,
    568,
    569,
    570,
    577,
    578,
    579,
    580,
    588,
    589,
    590,
    599,
    600,
    660,
    666,
    667,
    668,
    669,
    670,
    677,
    678,
    679,
    680,
    688,
    689,
    690,
    699,
    700,
    770,
    777,
    778,
    779,
    780,
    788,
    789,
    790,
    799,
    800,
    880,
    888,
    889,
    890,
    899,
    900,
    990,
    999,
];

export { singleDigit, jodiDigit, singlePana, doublePana, tripplePana, panna };
