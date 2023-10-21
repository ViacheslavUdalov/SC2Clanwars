using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Net.Http.Headers;

namespace SC2Clanwars.Controllers;
[ApiController]
[Route("api/upload")]
public class FileUploadController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;
    public FileUploadController(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    [HttpPost(""), DisableRequestSizeLimit]
    // [RequestSizeLimit(2097152)] // Ограничение размера запроса (2 МБ)
    // [RequestFormLimits(MultipartBodyLengthLimit = 2097152)] // Ограничение размера тела запроса (2 МБ)
    public  IActionResult UploadBannerUrl()
    {
        try
        {
            var file = Request.Form.Files[0];
            var folderName = Path.Combine("StaticFiles", "Images");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            
            if (file != null && file.Length > 0)
            {
                // проверяем на совпадение типов файлов, которые можно загружать
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim().ToString();
                var fullPath = Path.Combine(pathToSave, fileName);
                var dbPath = Path.Combine(folderName, fileName).Replace("\\", "/");;
                    //  using используемое для управления ресурсами,  После завершения блока using,
                    // ресурсы, выделенные для объекта FileStream, будут автоматически освобождены. 
                    // FileStream представляет поток файла для операций ввода-вывода с файлами. 
                
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                         file.CopyTo(stream);
                    }
                    // возвращает путь к загруженному файлу
                    return Ok(new { imagePath = dbPath });
            }
            else
            {
                return BadRequest("Файл не найден");
            }
         
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Intertal server error: {e}");
        }
    }
    
    [HttpGet("{imageName}")]
    public IActionResult GetImage(string imageName)
    {
        var imagePath = Path.Combine(_environment.WebRootPath, imageName);
        if (System.IO.File.Exists(imagePath))
        {
            var provider = new FileExtensionContentTypeProvider();
            if (provider.TryGetContentType(imageName, out var contentType))
            {
                return PhysicalFile(imagePath, contentType);
            }
        }
        return NotFound("Image not found");
    }
    
}