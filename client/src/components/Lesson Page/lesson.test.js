import { render} from '@testing-library/react';
import Section from './section';

describe("Lesson page displays elements", () => {
    test('The concept and question are displayed', () => {
      const lesson = {
        concept: 'concept 1',
        question: 'Q1',
      };
    
      const { getByText } = render(<Section lesson={lesson} />);
      const concept = getByText('concept 1');
      const question = getByText('Q1');
      expect(concept).toBeInTheDocument();
      expect(question).toBeInTheDocument();
    });
  })