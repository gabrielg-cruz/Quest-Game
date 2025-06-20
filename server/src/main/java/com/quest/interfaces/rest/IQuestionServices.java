package com.quest.interfaces.rest;

import java.util.List;

import com.quest.dto.rest.Question.QuestionCreateDTO;
import com.quest.dto.rest.Question.QuestionResponseDTO;
import com.quest.dto.rest.Question.QuestionUpdateDTO;
import com.quest.dto.rest.Question.QuestionsWithThemeDTO;
import com.quest.models.Question;
import jakarta.validation.Valid;

public interface IQuestionServices {

    long count();

    Question findQuestionById(long id);

    Question findRandomByTheme(Long themeId);

    List<QuestionResponseDTO> createMany(List<QuestionCreateDTO> questionCreateDTOs);

    List<QuestionResponseDTO> findAll();

    QuestionResponseDTO create(QuestionCreateDTO questionCreateDTO);

    QuestionResponseDTO update(QuestionUpdateDTO questionCreateDTO);

    QuestionResponseDTO findById(long id);

    void delete(long id);

    void createQuestionsWithTheme(QuestionsWithThemeDTO dto);
}
