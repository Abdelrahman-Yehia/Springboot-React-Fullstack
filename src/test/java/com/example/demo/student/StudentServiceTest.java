package com.example.demo.student;

import com.example.demo.student.exception.BadRequestException;

import com.example.demo.student.exception.StudentNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;
    private StudentService underTest;

    @BeforeEach
    void setup() {
        underTest = new StudentService(studentRepository);
        studentRepository.deleteAll();
    }

    @Test
    void getAllStudentsTest() {

        underTest.getAllStudents();
        verify(studentRepository).findAll();
    }

    @Test
    void addStudentTest() {
        String email = "Sultan@icloud.com";
        String name = "Sultan";
        Gender gender = Gender.MALE;
        Student givenStudent = new Student(
                name,
                email,
                gender
        );

        underTest.addStudent(givenStudent);

        verify(studentRepository).save(givenStudent);
    }

    @Test
    void addStudent_WithUniqueEmail_ShouldSaveStudent() {
        // Arrange
        String email = "Sultan@icloud.com";
        String name = "Sultan";
        Gender gender = Gender.MALE;
        Student givenStudent = new Student(
                name,
                email,
                gender
        );


        // Mock the behavior of selectExistsEmail to return false (unique email)
        when(studentRepository.selectExistsEmail(givenStudent.getEmail())).thenReturn(false);

        // Act
        underTest.addStudent(givenStudent);

        // Assert
        verify(studentRepository).save(givenStudent);
    }

    @Test
    void addStudent_WithExistingEmail_ShouldThrowBadRequestException() {
        // Arrange
        String email = "Sultan@icloud.com";
        String name = "Sultan";
        Gender gender = Gender.MALE;
        Student givenStudent = new Student(
                name,
                email,
                gender
        );

        // Mock the behavior of selectExistsEmail to return true (existing email)
        when(studentRepository.selectExistsEmail(givenStudent.getEmail())).thenReturn(true);

        // Act and Assert
        assertThatThrownBy(() -> underTest.addStudent(givenStudent))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("Email already exists!");

        // Verify that save was not called
        verify(studentRepository, never()).save(any());
    }

    @Test
    void deleteStudent_WithExistingStudentId_ShouldDeleteStudent() {
        // Arrange
        Long studentId = 1L;

        // Mock the behavior of existsById to return true (student exists)
        when(studentRepository.existsById(studentId)).thenReturn(true);

        // Act
        underTest.deleteStudent(studentId);

        // Assert
        verify(studentRepository).deleteById(studentId);
    }

    @Test
    void deleteStudent_WithNonExistingStudentId_ShouldThrowStudentNotFoundException() {
        // Arrange
        Long studentId = 1L;

        // Mock the behavior of existsById to return false (student does not exist)
        when(studentRepository.existsById(studentId)).thenReturn(false);

        // Act and Assert
        assertThatThrownBy(() -> underTest.deleteStudent(studentId))
                .isInstanceOf(StudentNotFoundException.class)
                .hasMessage("Student does not exist!");

        // Verify that deleteById was not called
        verify(studentRepository, never()).deleteById(anyLong());
    }
}