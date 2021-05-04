const { GraphQLEnumType } = require('../scalars');

module.exports = {
  ContentTypeEnumType: new GraphQLEnumType({
    name: 'ContentTypeEnum',
    values: {
      PARAGRAPH: { value: 0 },
      H1: { value: 1 },
      H2: { value: 2 },
      H3: { value: 3 },
      IMAGE: { value: 4 },
      QUOTE: { value: 5 },
      ORDERED_LIST: { value: 6 },
      UNORDERED_LIST: { value: 7 },
      TABLE: { value: 8 },
      BAR_GRAPH: { value: 9 },
      COLUMN_GRAPH: { value: 10 },
      LINE_CHART: { value: 11 },
      PIE_CHART: { value: 12 },
      HORIZONTAL_LINE: { value: 13 },
    },
  }),
  AlignEnumType: new GraphQLEnumType({
    name: 'AlignEnum',
    values: {
      LEFT: { value: 0 },
      CENTER: { value: 1 },
      RIGHT: { value: 2 },
      JUSTIFY: { value: 3 },
    },
  }),
  OrderedListStyleEnumType: new GraphQLEnumType({
    name: 'OrderedListStyleEnum',
    values: {
      UPPER_ALPHA: { value: 0 },
      LOWER_ALPHA: { value: 1 },
      UPPER_ROMAN: { value: 2 },
      LOWER_ROMAN: { value: 3 },
      NUMERICAL: { value: 4 },
    },
  }),
  UnorderedListStyleEnumType: new GraphQLEnumType({
    name: 'UnorderedListStyleEnum',
    values: {
      FILLED_CIRCLE: { value: 0 },
      HOLLOW_CIRCLE: { value: 1 },
      DASH: { value: 2 },
      FILLED_SQUARE: { value: 3 },
      HOLLOW_SQUARE: { value: 4 },
    },
  }),
};
