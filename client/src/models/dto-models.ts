export interface ThemeCreateDTO {
    name: string;
    code: string;
    free: boolean;
    cost: number;
  }
  
  export interface ThemeAvailabilityDTO {
    free: boolean;
  }
  
  export interface ThemeResponseDTO {
    id: number;
    name: string;
    code: string;
    free: boolean;
    cost: number;
  }
  
  export interface ThemeUpdateDTO {
    id: number;
    name: string;
    code: string;
    free: boolean;
    cost: number;
  }
  
  export interface QuestionCreateDTO {
    questionText: string;
    themeId: number;
    difficulty: string;
    options: QuestionOptionCreateDTO[];
  }
  
  export interface QuestionResponseDTO {
    id: number;
    text: string;
    options: QuestionOptionResponseDTO[];
    difficulty: string;
    themeId: number;
  }
  
  export interface QuestionUpdateDTO {
    id: number;
    questionText: string;
    themeId: number;
    difficulty: string;
    options: QuestionOptionCreateDTO[];
  }
  
  export interface QuestionOptionCreateDTO {
    optionText: string;
    correct: boolean;
    questionId: number;
  }
  
  export interface QuestionOptionResponseDTO {
    id: number;
    optionText: string;
  }
  
  export interface QuestionOptionUpdateDTO {
    id: number;
    optionText: string;
    correct: boolean;
    questionId: number;
  }
  