package com.example.demo.integration;

import com.example.demo.student.Gender;
import com.example.demo.student.Student;
import com.example.demo.student.StudentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
@AutoConfigureMockMvc
@Disabled
public class StudentControllerIT {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private StudentRepository studentRepository;

    private final Faker faker = new Faker();
    @Test
    void canAddNewStudent() throws Exception {
        String name = String.format(
                "%s %s",
                faker.name().firstName(),
                faker.name().lastName()
        );
        String email = String.format("%s@gmail.com", StringUtils.deleteWhitespace(name.toLowerCase()));
        Gender gender = Gender.MALE;
        Student givenStudent = new Student(
                name,
                email,
                gender
        );
        ResultActions resultActions = mockMvc
                .perform(post("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(givenStudent)));

        resultActions.andExpect(status().isCreated());
        List<Student> students = studentRepository.findAll();
        assertThat(students)
                .usingElementComparatorIgnoringFields("id")
                .contains(givenStudent);
    }

    @Test
    void canDeleteNewStudent() throws Exception {
        String name = String.format(
                "%s %s",
                faker.name().firstName(),
                faker.name().lastName()
        );
        String email = String.format("%s@gmail.com", StringUtils.deleteWhitespace(name.toLowerCase()));
        Gender gender = Gender.MALE;
        Student givenStudent = new Student(
                name,
                email,
                gender
        );

        studentRepository.save(givenStudent);

        ResultActions resultActions = mockMvc
                .perform(delete("/api/v1/students/" + givenStudent.getId()));

        boolean studentExists = studentRepository.existsById(givenStudent.getId());

        resultActions.andExpect(status().isNoContent());
        assertThat(studentExists).isFalse();
    }
}
