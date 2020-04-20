using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Love_Letter.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Love_Letter.Models;

namespace Love_Letter.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public IActionResult Index()
        {
            return View();
        }


        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user != null)
            {
                //sign  in
                var signInresult = await _signInManager.PasswordSignInAsync(username, password, false, false);
                if (signInresult.Succeeded)
                {
                    return RedirectToAction("Index");
                }
            }


            return View();
        }

        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Register(string username, string password,string email)
        {
            var user = new IdentityUser
            {
                UserName = username,
                Email = email,
            };

            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded)
            {

                //sign  in
                var signInresult = await _signInManager.PasswordSignInAsync(username, password, false, false);
                if (signInresult.Succeeded)
                {
                    return RedirectToAction("Index");
                }

            }

            return View();
        }
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index");
        }
    }


}