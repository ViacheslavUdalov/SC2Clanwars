﻿using System.ComponentModel.DataAnnotations;

namespace SC2Clanwars.LoginRegistration;

public class RegistrationRequest
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    [Required]
    public string FullName { get; set; } = string.Empty;
    [Required, DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;
    [Required, DataType(DataType.Password), Compare(nameof(Password), ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; } = string.Empty;
    
}