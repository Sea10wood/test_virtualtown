import os
import random
import openai
from dotenv import load_dotenv
from memory import MemoryStream
from planner import Planner
from dialog import DialogueSystem

load_dotenv()

class Agent:
    def __init__(self, name, profile):
        self.name = name
        self.profile = profile
        self.dialogue = DialogueSystem()

    def interact(self, other_agent, theme):
        """他のエージェントと会話"""
        return self.dialogue.generate_conversation(self, other_agent, theme)