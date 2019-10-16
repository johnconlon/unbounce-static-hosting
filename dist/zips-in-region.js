// GLOBAL
// TODO: store on window or global `sundae` namespace.
// These zips are considered in region for purposes of tracking qualified leads
// ref: https://docs.google.com/document/d/1x2DoUJ2iBD-ZdfztBDaFt-f7_fTQG4HhXHFYETjGE-M

const zipsInRegion = [
  // San Diego
  91902, 91910, 91911, 91913,
  91914, 91915, 91932, 91941,
  91942, 91945, 91950, 91977,
  91978, 92007, 92008, 92009,
  92010, 92011, 92014, 92019,
  92020, 92021, 92024, 92025,
  92026, 92027, 92029, 92037,
  92040, 92054, 92056, 92057,
  92064, 92065, 92067, 92069,
  92071, 92075, 92078, 92081,
  92083, 92084, 92091, 92092,
  92093, 92101, 92102, 92103,
  92104, 92105, 92106, 92107,
  92108, 92109, 92110, 92111,
  92113, 92114, 92115, 92116,
  92117, 92118, 92119, 92120,
  92121, 92122, 92123, 92124,
  92126, 92127, 92128, 92129,
  92130, 92131, 92132, 92134,
  92135, 92136, 92139, 92140,
  92145, 92154, 92155, 92173,
  92182,
  // Inland
  91701, 91708, 91709, 91710,
  91730, 91737, 91739, 91743,
  91752, 91761, 91762, 91763,
  91764, 91784, 91786, 92220,
  92223, 92278, 92307, 92308,
  92313, 92316, 92318, 92320,
  92324, 92335, 92336, 92337,
  92344, 92345, 92346, 92350,
  92354, 92359, 92369, 92371,
  92373, 92374, 92376, 92377,
  92392, 92394, 92395, 92399,
  92401, 92404, 92405, 92408,
  92410, 92411, 92415, 92501,
  92503, 92504, 92505, 92506,
  92507, 92508, 92509, 92518,
  92521, 92530, 92532, 92543,
  92544, 92545, 92548, 92551,
  92553, 92555, 92557, 92562,
  92563, 92567, 92570, 92571,
  92582, 92583, 92584, 92585,
  92586, 92587, 92590, 92591,
  92592, 92595, 92596, 92860,
  92879, 92880, 92881, 92882,
  92883, 92407,
  // East LA
  90601, 90602, 90603, 90604,
  90605, 90638, 91006, 91007,
  91008, 91010, 91016, 91024,
  91702, 91706, 91711, 91722,
  91723, 91724, 91731, 91732,
  91733, 91740, 91741, 91744,
  91745, 91746, 91748, 91750,
  91765, 91766, 91767, 91768,
  91773, 91780, 91789, 91790,
  91791, 91792,
  // LA
  90001, 90002, 90003, 90004,
  90005, 90006, 90007, 90008,
  90009, 90010, 90011, 90012,
  90013, 90014, 90015, 90016,
  90017, 90018, 90019, 90020,
  90021, 90022, 90023, 90024,
  90025, 90026, 90027, 90028,
  90029, 90031, 90032, 90033,
  90034, 90035, 90036, 90037,
  90038, 90039, 90040, 90041,
  90042, 90043, 90044, 90045,
  90046, 90047, 90048, 90049,
  90056, 90057, 90058, 90059,
  90061, 90062, 90063, 90064,
  90065, 90066, 90067, 90068,
  90069, 90071, 90073, 90077,
  90079, 90089, 90094, 90095,
  90201, 90210, 90211, 90212,
  90220, 90221, 90222, 90230,
  90232, 90240, 90241, 90242,
  90245, 90247, 90248, 90249,
  90250, 90254, 90255, 90260,
  90262, 90266, 90270, 90274,
  90275, 90277, 90278, 90280,
  90291, 90292, 90293, 90301,
  90302, 90303, 90304, 90305,
  90401, 90402, 90403, 90404,
  90405, 90501, 90502, 90503,
  90504, 90505, 90506, 90510,
  90606, 90640, 90650, 90660,
  90670, 90701, 90703, 90706,
  90710, 90712, 90713, 90715,
  90716, 90717, 90723, 90731,
  90732, 90744, 90745, 90746,
  90755, 90802, 90803, 90804,
  90805, 90806, 90807, 90808,
  90810, 90813, 90814, 90815,
  90822, 90831, 90840, 91001,
  91011, 91020, 91030, 91040,
  91042, 91101, 91103, 91104,
  91105, 91106, 91107, 91108,
  91188, 91201, 91202, 91203,
  91204, 91205, 91206, 91207,
  91208, 91210, 91214, 91303,
  91304, 91306, 91311, 91316,
  91321, 91324, 91325, 91326,
  91330, 91331, 91335, 91340,
  91342, 91343, 91344, 91345,
  91350, 91351, 91352, 91354,
  91355, 91356, 91364, 91367,
  91381, 91383, 91384, 91387,
  91390, 91401, 91402, 91403,
  91405, 91406, 91411, 91423,
  91436, 91501, 91502, 91504,
  91505, 91506, 91601, 91602,
  91604, 91605, 91606, 91607,
  91608, 91754, 91755, 91770,
  91775, 91776, 91801, 91803,
  93510, 93534, 93535, 93550,
  93551, 93552, 93599,
  // Orange County
  90620, 90621, 90623, 90630,
  90631, 90680, 90720, 90740,
  92602, 92603, 92604, 92606,
  92610, 92612, 92614, 92617,
  92618, 92620, 92624, 92625,
  92626, 92627, 92628, 92629,
  92630, 92637, 92646, 92647,
  92648, 92649, 92651, 92653,
  92655, 92656, 92657, 92660,
  92661, 92662, 92663, 92672,
  92673, 92675, 92677, 92683,
  92688, 92691, 92692, 92694,
  92697, 92698, 92701, 92703,
  92704, 92705, 92706, 92707,
  92708, 92780, 92782, 92801,
  92802, 92804, 92805, 92806,
  92807, 92808, 92821, 92822,
  92823, 92831, 92832, 92833,
  92835, 92840, 92841, 92843,
  92844, 92845, 92861, 92865,
  92866, 92867, 92868, 92869,
  92870, 92871, 92886, 92887,
  // Ventura
  90620, 90621, 90623, 90630,
  90631, 90680, 90720, 90740,
  92602, 92603, 92604, 92606,
  92610, 92612, 92614, 92617,
  92618, 92620, 92624, 92625,
  92626, 92627, 92628, 92629,
  92630, 92637, 92646, 92647,
  92648, 92649, 92651, 92653,
  92655, 92656, 92657, 92660,
  92661, 92662, 92663, 92672,
  92673, 92675, 92677, 92683,
  92688, 92691, 92692, 92694,
  92697, 92698, 92701, 92703,
  92704, 92705, 92706, 92707,
  92708, 92780, 92782, 92801,
  92802, 92804, 92805, 92806,
  92807, 92808, 92821, 92822,
  92823, 92831, 92832, 92833,
  92835, 92840, 92841, 92843,
  92844, 92845, 92861, 92865,
  92866, 92867, 92868, 92869,
  92870, 92871, 92886, 92887
];
